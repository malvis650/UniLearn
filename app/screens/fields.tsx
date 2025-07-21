import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';

const Fields = () => {
  // Complete data structure with online image URIs
  const fieldsData = [
    {
      id: 1,
      name: 'Computer Engineering',
      image: { uri: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=500' },
      careers: [
        {
          id: 101,
          title: 'Software Engineer',
          description: 'Design, develop, and test software systems for various applications. Work on everything from operating systems to mobile apps.',
          image: { uri: 'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=500' },
          courses: ['Data Structures', 'Algorithms', 'Software Engineering', 'Database Systems', 'Operating Systems', 'Computer Architecture'],
          salaryRange: '$70,000 - $150,000'
        },
        {
          id: 102,
          title: 'Network Engineer',
          description: 'Design and implement computer networks for organizations. Ensure network security and optimal performance.',
          image: { uri: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=500' },
          courses: ['Computer Networks', 'Network Security', 'Wireless Communication', 'Cloud Computing', 'Distributed Systems'],
          salaryRange: '$65,000 - $130,000'
        }
      ]
    },
    {
      id: 2,
      name: 'Business and Finance',
      image: { uri: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=500' },
      careers: [
        {
          id: 201,
          title: 'Financial Analyst',
          description: 'Analyze financial data and provide guidance for business decisions. Prepare reports and forecast future financial performance.',
          image: { uri: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500' },
          courses: ['Financial Accounting', 'Corporate Finance', 'Investment Analysis', 'Risk Management', 'Econometrics'],
          salaryRange: '$60,000 - $120,000'
        },
        {
          id: 202,
          title: 'Business Consultant',
          description: 'Help organizations improve performance and efficiency by analyzing problems and developing improvement strategies.',
          image: { uri: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500' },
          courses: ['Business Strategy', 'Organizational Behavior', 'Marketing Management', 'Operations Management', 'Business Analytics'],
          salaryRange: '$70,000 - $140,000'
        }
      ]
    },
    {
      id: 3,
      name: 'Tourism and Hotel Management',
      image: { uri: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?w=500' },
      careers: [
        {
          id: 301,
          title: 'Hotel Manager',
          description: 'Oversee daily operations of hotels and resorts. Manage staff, ensure guest satisfaction, and maintain profitability.',
          image: { uri: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500' },
          courses: ['Hospitality Management', 'Food and Beverage Management', 'Tourism Economics', 'Customer Service', 'Revenue Management'],
          salaryRange: '$50,000 - $100,000'
        }
      ]
    },
    {
      id: 4,
      name: 'Civil Engineering',
      image: { uri: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?w=500' },
      careers: [
        {
          id: 401,
          title: 'Structural Engineer',
          description: 'Design and analyze structures to withstand stresses and pressures. Ensure buildings, bridges, and other structures are safe and durable.',
          image: { uri: 'https://images.unsplash.com/photo-1581093196271-cb6a3e69c2f9?w=500' },
          courses: ['Structural Analysis', 'Concrete Design', 'Steel Design', 'Geotechnical Engineering', 'Earthquake Engineering'],
          salaryRange: '$65,000 - $120,000'
        }
      ]
    },
    {
      id: 5,
      name: 'Arts and Culture',
      image: { uri: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=500' },
      careers: [
        {
          id: 501,
          title: 'Museum Curator',
          description: 'Acquire, care for, and develop museum collections. Plan exhibitions and educational programs to engage the public with cultural heritage.',
          image: { uri: 'https://images.unsplash.com/photo-1580130732478-4e339fb33746?w=500' },
          courses: ['Art History', 'Museum Studies', 'Cultural Heritage Management', 'Exhibition Design', 'Conservation Science'],
          salaryRange: '$45,000 - $90,000'
        }
      ]
    },
    {
      id: 6,
      name: 'Education Science',
      image: { uri: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500' },
      careers: [
        {
          id: 601,
          title: 'Curriculum Developer',
          description: 'Design and implement educational programs and materials. Work with teachers and administrators to improve learning outcomes.',
          image: { uri: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500' },
          courses: ['Learning Theories', 'Instructional Design', 'Educational Assessment', 'Curriculum Planning', 'Educational Technology'],
          salaryRange: '$45,000 - $85,000'
        }
      ]
    },
    {
      id: 7,
      name: 'Communication',
      image: { uri: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=500' },
      careers: [
        {
          id: 701,
          title: 'Public Relations Specialist',
          description: 'Create and maintain a favorable public image for organizations. Write press releases, organize events, and respond to media inquiries.',
          image: { uri: 'https://images.unsplash.com/photo-1573497620053-ea5300f94b21?w=500' },
          courses: ['Public Relations', 'Media Writing', 'Crisis Communication', 'Social Media Strategy', 'Brand Communication'],
          salaryRange: '$45,000 - $95,000'
        }
      ]
    },
    {
      id: 8,
      name: 'Electrical Engineering',
      image: { uri: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=500' },
      careers: [
        {
          id: 801,
          title: 'Power Systems Engineer',
          description: 'Design, develop, and maintain systems for generating and distributing electrical power. Work on power plants, transmission lines, and distribution networks.',
          image: { uri: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=500' },
          courses: ['Power Systems', 'Electric Machines', 'Renewable Energy Systems', 'Power Electronics', 'Smart Grid Technology'],
          salaryRange: '$70,000 - $130,000'
        }
      ]
    },
    {
      id: 9,
      name: 'Agricultural Science',
      image: { uri: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=500' },
      careers: [
        {
          id: 901,
          title: 'Agronomist',
          description: 'Study soil management and crop production to improve farming efficiency and sustainability. Advise farmers on best practices.',
          image: { uri: 'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=500' },
          courses: ['Soil Science', 'Crop Physiology', 'Plant Breeding', 'Weed Science', 'Precision Agriculture'],
          salaryRange: '$50,000 - $95,000'
        }
      ]
    },
    {
      id: 10,
      name: 'Biomedical Engineering',
      image: { uri: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=500' },
      careers: [
        {
          id: 1001,
          title: 'Medical Device Engineer',
          description: 'Design and develop medical equipment and devices, such as artificial organs, prostheses, and diagnostic machines.',
          image: { uri: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500' },
          courses: ['Biomechanics', 'Medical Instrumentation', 'Biomaterials', 'Physiological Systems', 'Regulatory Affairs'],
          salaryRange: '$70,000 - $140,000'
        }
      ]
    },
    {
      id: 11,
      name: 'Mechanical Engineering',
      image: { uri: 'https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=500' },
      careers: [
        {
          id: 1101,
          title: 'Automotive Engineer',
          description: 'Design, develop, and test vehicles and their components. Work on improving performance, safety, and fuel efficiency.',
          image: { uri: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500' },
          courses: ['Vehicle Dynamics', 'Internal Combustion Engines', 'Automotive Electronics', 'Alternative Fuel Vehicles', 'Chassis Design'],
          salaryRange: '$65,000 - $130,000'
        }
      ]
    }
  ];

  const [expandedField, setExpandedField] = useState<number | null>(null);
  const [expandedCareer, setExpandedCareer] = useState<number | null>(null);

  const toggleField = (fieldId: number) => {
    if (expandedField === fieldId) {
      setExpandedField(null);
      setExpandedCareer(null);
    } else {
      setExpandedField(fieldId);
      setExpandedCareer(null);
    }
  };

  const toggleCareer = (careerId: number) => {
    if (expandedCareer === careerId) {
      setExpandedCareer(null);
    } else {
      setExpandedCareer(careerId);
    }
  };

  const renderCareerDetails = (career: {
    id: number;
    title: string;
    description: string;
    image: { uri: string };
    courses: string[];
    salaryRange: string;
  }) => {
    return (
      <View style={styles.careerDetailContainer}>
        <Image source={career.image} style={styles.careerImage} resizeMode="cover" />
        <Text style={styles.careerDescription}>{career.description}</Text>
        
        <Text style={styles.sectionTitle}>Core Courses:</Text>
        <View style={styles.coursesContainer}>
          {career.courses.map((course: string, index: number) => (
            <View key={index} style={styles.courseItem}>
              <Text style={styles.courseText}>• {course}</Text>
            </View>
          ))}
        </View>
        
        <Text style={styles.salaryText}>Average Salary Range: {career.salaryRange}</Text>
        
        <TouchableOpacity 
          style={styles.enrollButton}
          onPress={() => console.log(`Enrolling in ${career.title}`)}
        >
          <Text style={styles.enrollButtonText}>Apply for this Program</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>University Fields of Study</Text>
      <Text style={styles.subheader}>Explore career paths and required courses</Text>
      
      {fieldsData.map((field) => (
        <View key={field.id} style={styles.fieldContainer}>
          <TouchableOpacity 
            style={[
              styles.fieldHeader,
              expandedField === field.id && styles.expandedFieldHeader
            ]} 
            onPress={() => toggleField(field.id)}
          >
            <Image source={field.image} style={styles.fieldImage} resizeMode="cover" />
            <View style={styles.fieldTextContainer}>
              <Text style={styles.fieldTitle}>{field.name}</Text>
              <Text style={styles.fieldSubtitle}>
                {expandedField === field.id ? 'Tap to collapse' : 'Tap to explore careers'}
              </Text>
            </View>
          </TouchableOpacity>

          {expandedField === field.id && (
            <View style={styles.careersContainer}>
              {field.careers.map((career) => (
                <View key={career.id} style={styles.careerWrapper}>
                  <TouchableOpacity 
                    style={[
                      styles.careerHeader,
                      expandedCareer === career.id && styles.expandedCareerHeader
                    ]}
                    onPress={() => toggleCareer(career.id)}
                  >
                    <Text style={styles.careerTitle}>{career.title}</Text>
                  </TouchableOpacity>

                  {expandedCareer === career.id && renderCareerDetails(career)}
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 15,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2c3e50',
    textAlign: 'center',
  },
  subheader: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 25,
    textAlign: 'center',
  },
  fieldContainer: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#3498db',
  },
  expandedFieldHeader: {
    backgroundColor: '#2980b9',
  },
  fieldImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    borderWidth: 2,
    borderColor: 'white',
  },
  fieldTextContainer: {
    flex: 1,
  },
  fieldTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 3,
  },
  fieldSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    fontStyle: 'italic',
  },
  careersContainer: {
    padding: 10,
  },
  careerWrapper: {
    marginBottom: 10,
  },
  careerHeader: {
    padding: 15,
    backgroundColor: '#ecf0f1',
    borderRadius: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#3498db',
  },
  expandedCareerHeader: {
    backgroundColor: '#d6eaf8',
    borderLeftColor: '#e74c3c',
  },
  careerTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#2c3e50',
  },
  careerDetailContainer: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginTop: 5,
  },
  careerImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 15,
  },
  careerDescription: {
    fontSize: 15,
    color: '#34495e',
    marginBottom: 15,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  coursesContainer: {
    marginBottom: 15,
  },
  courseItem: {
    marginBottom: 5,
  },
  courseText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  salaryText: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 10,
    color: '#27ae60',
    textAlign: 'right',
  },
  enrollButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
  },
  enrollButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Fields;