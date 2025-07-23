import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AddPost from "../screens/addPost";
import Home from "../screens/home";
import Profile from "../screens/profile";
import Search from "../screens/search";
import Settings from "../screens/settings";

// Define the type for the tabs

type Tabs = "home" | "search" | "profile" | "settings" | "addPost";

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tabs>("home");
  const insets = useSafeAreaInsets();

  // Mock user data
  const user = {
    name: "Malvis Chiatoh",
    profilePic: require('@/assets/images/placeHolder.png') // Update with your path
  };

  const renderScreen = () => {
    switch (activeTab) {
      case "home":
        return <Home />;
      case "search":
        return <Search />;
      case "profile":
        return <Profile />;
      case "settings":
        return <Settings />;
      case "addPost":
        return <AddPost />;
      default:
        return <Home />;
    }
  };

  return (
    <View style={styles.container}>
      {insets.top > 0 && <View style={[styles.safeAreaTop, { height: insets.top }]} />}
      
      <View style={styles.contentContainer}>
        {/* Header Section - Only shown on home tab */}
        {activeTab === "home" && (
          <View style={styles.headerContainer}>
            <View style={styles.profileContainer}>
              <Image
                source={user.profilePic}
                style={styles.profileImage}
              />
              <View>
                <Text style={styles.greetingText}>Good morning</Text>
                <Text style={styles.userName}>{user.name}</Text>
              </View>
            </View>
            <View style={styles.notificationIcon}>
              <TouchableOpacity onPress={() => console.log('Notifications')}>
                <Image 
                  source={require('@/assets/images/icons8-notification-50.png')} // Update with your path
                  style={styles.notificationIconImage}
                />
              </TouchableOpacity>
              
            </View>
          </View>
        )}

        {/* Screen Content */}
        <View style={styles.screenContent}>
          {renderScreen()}
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNavContainer, { paddingBottom: insets.bottom + 10 }]}>
        {/* Left Navigation Items */}
        <View style={styles.navSection}>
          <NavButton
            icon={activeTab === "home" 
              ? require('@/assets/images/icons8-home.gif')
              : require('@/assets/images/icons8-home-50.png')}
            label="Home"
            isActive={activeTab === "home"}
            onPress={() => setActiveTab("home")}
          />
          <NavButton
            icon={activeTab === "search" 
              ? require('@/assets/images/icons8-search.gif')
              : require('@/assets/images/icons8-search-50.png')}
            label="Search"
            isActive={activeTab === "search"}
            onPress={() => setActiveTab("search")}
          />
        </View>

        {/* Central Add Post Button */}
        <View style={styles.addButtonContainer}>
          <TouchableOpacity 
            style={styles.addButton} 
            onPress={() => setActiveTab("addPost")}
          >
            <Image 
              source={require('@/assets/images/icons8-add.gif')} // Update with your path
              style={styles.addIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Right Navigation Items */}
        <View style={styles.navSection}>
          <NavButton
            icon={activeTab === "profile" 
              ? require('@/assets/images/icons8-profile.gif')
              : require('@/assets/images/icons8-profile-50.png')}
            label="Profile"
            isActive={activeTab === "profile"}
            onPress={() => setActiveTab("profile")}
          />
          <NavButton
            icon={activeTab === "settings" 
              ? require('../../assets/images/icons8-setting.gif')
              : require('@/assets/images/icons8-settings-50.png')}
            label="Settings"
            isActive={activeTab === "settings"}
            onPress={() => setActiveTab("settings")}
          />
        </View>
      </View>
    </View>
  );
};

// Reusable NavButton component with custom icons
const NavButton = ({ 
  icon, 
  label, 
  isActive, 
  onPress 
}: {
  icon: ImageSourcePropType;
  label: string;
  isActive: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity style={styles.navButton} onPress={onPress}>
      <Image
        source={icon}
        style={styles.navIcon}
      />
      <Text style={[
        styles.navButtonText,
        { color: isActive ? "#3498db" : "#999" }
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    paddingBottom: 70, // Space for bottom nav
  },
  headerContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  greetingText: {
    color: "#777",
    fontSize: 14,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    color: "#3498db",
  },
  notificationIcon: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  notificationIconImage: {
    width: 24,
    height: 24,
  },
  screenContent: {
    flex: 1,
    padding: 15,
  },
  bottomNavContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  navSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  navButton: {
    alignItems: 'center',
    padding: 5,
    width: 70,
  },
  navIcon: {
    width: 26,
    height: 26,
    resizeMode: 'contain',
  },
  navButtonText: {
    fontSize: 12,
    marginTop: 3,
  },
  addButtonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    top: -25,
  },
  addButton: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 5,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  addIcon: {
    width: 54,
    height: 54,
  },
  safeAreaTop: {
    backgroundColor: "#fff",
  },
});

export default Index;