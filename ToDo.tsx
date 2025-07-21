import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
    Button,
    FlatList,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';

type Task = {
  id: string;
  text: string;
  category: string;
  completed: boolean;
  createdAt: string;
};

type SortType = 'date' | 'status';

export default function App(): React.ReactElement {
  const colorScheme = useColorScheme();
  const [task, setTask] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [sortBy, setSortBy] = useState<SortType>('date');
  const [darkMode, setDarkMode] = useState<boolean>(colorScheme === 'dark');

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    saveTasks();
  }, [taskList]);

  const loadTasks = async () => {
    try {
      const stored = await AsyncStorage.getItem('@tasks');
      if (stored) {
        setTaskList(JSON.parse(stored));
      }
    } catch (e) {
      console.log('Failed to load tasks.');
    }
  };

  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(taskList));
    } catch (e) {
      console.log('Failed to save tasks.');
    }
  };

  const addTask = () => {
    if (task.trim() === '') return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: task,
      category: category || 'General',
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTaskList((prev) => [...prev, newTask]);
    setTask('');
    setCategory('');
  };

  const deleteTask = (id: string) => {
    setTaskList((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleComplete = (id: string) => {
    setTaskList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const toggleSort = () => {
    setSortBy((prev) => (prev === 'date' ? 'status' : 'date'));
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
  };

  const sortedTasks = [...taskList].sort((a, b) => {
    if (sortBy === 'status') {
      return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const styles = createStyles(darkMode);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📝 My To-Do List</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={task}
          onChangeText={setTask}
          placeholderTextColor={darkMode ? '#aaa' : '#555'}
        />
        <TextInput
          style={styles.input}
          placeholder="Category"
          value={category}
          onChangeText={setCategory}
          placeholderTextColor={darkMode ? '#aaa' : '#555'}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      <View style={styles.optionsRow}>
        <Button title={`Sort by: ${sortBy}`} onPress={toggleSort} />
        <View style={styles.switchRow}>
          <Text style={styles.text}>Dark Mode</Text>
          <Switch value={darkMode} onValueChange={toggleTheme} />
        </View>
      </View>

      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.taskItem,
              item.completed && styles.completedTask,
            ]}
          >
            <TouchableOpacity onPress={() => toggleComplete(item.id)}>
              <Text style={styles.taskText}>
                {item.completed ? '✅ ' : '⬜ '}
                {item.text}
              </Text>
            </TouchableOpacity>
            <View style={styles.taskMeta}>
              <Text style={styles.category}>{item.category}</Text>
              <TouchableOpacity onPress={() => deleteTask(item.id)}>
                <Text style={styles.delete}>🗑️</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const createStyles = (dark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: dark ? '#121212' : '#fff',
      padding: 20,
      paddingTop: 50,
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: dark ? '#fff' : '#000',
      marginBottom: 20,
    },
    row: {
      flexDirection: 'row',
      gap: 10,
      marginBottom: 15,
    },
    input: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: dark ? '#555' : '#ccc',
      color: dark ? '#fff' : '#000',
      padding: 8,
    },
    optionsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    switchRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      marginRight: 10,
      color: dark ? '#eee' : '#222',
    },
    taskItem: {
      backgroundColor: dark ? '#1f1f1f' : '#f9f9f9',
      padding: 12,
      marginVertical: 4,
      borderRadius: 8,
    },
    completedTask: {
      opacity: 0.5,
    },
    taskText: {
      fontSize: 16,
      color: dark ? '#fff' : '#000',
    },
    taskMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
    },
    category: {
      fontStyle: 'italic',
      fontSize: 12,
      color: dark ? '#aaa' : '#666',
    },
    delete: {
      fontSize: 16,
      color: 'red',
    },
  });
