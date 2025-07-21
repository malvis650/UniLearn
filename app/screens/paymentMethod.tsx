import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

type PaymentMethod = {
  id: string;
  type: 'mobile' | 'bank';
  provider: 'mtn' | 'orange' | 'express-union' | 'afriland';
  title: string;
  lastFour?: string;
  isDefault: boolean;
  icon: any;
};

const PaymentMethodsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mobile' | 'bank'>('mobile');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<'mtn' | 'orange' | null>(null);
  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState<'express-union' | 'afriland' | null>(null);

  // Sample payment methods data
  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'mobile',
      provider: 'mtn',
      title: 'Mobile Money',
      lastFour: '7890',
      isDefault: true,
      icon: require('@/assets/images/Mobile Money.jpg'),
    },
    {
      id: '2',
      type: 'bank',
      provider: 'afriland',
      title: 'Afriland First Bank',
      lastFour: '4321',
      isDefault: false,
      icon: require('@/assets/images/Afriland.png'),
    },
  ];

  const mobileProviders = [
    { id: 'mtn', name: 'MTN Mobile Money', icon: require('@/assets/images/Mobile Money.jpg') },
    { id: 'orange', name: 'Orange Money', icon: require('@/assets/images/Orange Money.png') },
  ];

  const banks = [
    { id: 'express-union', name: 'Express Union', icon: require('@/assets/images/Express Union.png') },
    { id: 'afriland', name: 'Afriland First Bank', icon: require('@/assets/images/Afriland.png') },
  ];

  const handleAddPaymentMethod = () => {
    // In a real app, you would validate and save to backend
    Alert.alert('Success', 'Payment method added successfully');
    setIsAddingNew(false);
    setPhoneNumber('');
    setAccountNumber('');
    setSelectedProvider(null);
    setSelectedBank(null);
  };

  const renderPaymentMethod = (method: PaymentMethod) => (
    <View key={method.id} style={styles.paymentMethodCard}>
      <Image source={method.icon} style={styles.paymentMethodIcon} />
      <View style={styles.paymentMethodInfo}>
        <Text style={styles.paymentMethodTitle}>{method.title}</Text>
        {method.lastFour && (
          <Text style={styles.paymentMethodDetails}>
            •••• •••• •••• {method.lastFour}
          </Text>
        )}
      </View>
      {method.isDefault ? (
        <View style={styles.defaultBadge}>
          <Text style={styles.defaultBadgeText}>Default</Text>
        </View>
      ) : (
        <TouchableOpacity style={styles.makeDefaultButton}>
          <Text style={styles.makeDefaultText}>Make Default</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.removeButton}>
        <MaterialIcons name="delete-outline" size={22} color="#e74c3c" />
      </TouchableOpacity>
    </View>
  );

  const renderAddPaymentForm = () => (
    <View style={styles.addPaymentForm}>
      <Text style={styles.sectionTitle}>
        Add {activeTab === 'mobile' ? 'Mobile Money' : 'Bank Account'}
      </Text>

      {activeTab === 'mobile' ? (
        <>
          <Text style={styles.label}>Select Provider</Text>
          <View style={styles.providerOptions}>
            {mobileProviders.map(provider => (
              <TouchableOpacity
                key={provider.id}
                style={[
                  styles.providerOption,
                  selectedProvider === provider.id && styles.providerOptionSelected,
                ]}
                onPress={() => setSelectedProvider(provider.id as 'mtn' | 'orange')}
              >
                <Image source={provider.icon} style={styles.providerIcon} />
                <Text style={styles.providerName}>{provider.name}</Text>
                {selectedProvider === provider.id && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="6XX XXX XXX"
            placeholderTextColor="#888"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </>
      ) : (
        <>
          <Text style={styles.label}>Select Bank</Text>
          <View style={styles.providerOptions}>
            {banks.map(bank => (
              <TouchableOpacity
                key={bank.id}
                style={[
                  styles.providerOption,
                  selectedBank === bank.id && styles.providerOptionSelected,
                ]}
                onPress={() => setSelectedBank(bank.id as 'express-union' | 'afriland')}
              >
                <Image source={bank.icon} style={styles.providerIcon} />
                <Text style={styles.providerName}>{bank.name}</Text>
                {selectedBank === bank.id && (
                  <View style={styles.selectedIndicator}>
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.label}>Account Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your account number"
            placeholderTextColor="#888"
            value={accountNumber}
            onChangeText={setAccountNumber}
            keyboardType="numeric"
          />
        </>
      )}

      <View style={styles.formButtons}>
        <TouchableOpacity 
          style={styles.cancelButton}
          onPress={() => setIsAddingNew(false)}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.saveButton,
            (
              (activeTab === 'mobile' && (!phoneNumber || !selectedProvider)) ||
              (activeTab === 'bank' && (!accountNumber || !selectedBank))
            ) ? styles.saveButtonDisabled : null
          ]}
          onPress={handleAddPaymentMethod}
          disabled={
            (activeTab === 'mobile' && (!phoneNumber || !selectedProvider)) || 
            (activeTab === 'bank' && (!accountNumber || !selectedBank))
          }
        >
          <Text style={styles.saveButtonText}>Add Payment Method</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#3498db" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment Methods</Text>
          <View style={{ width: 24 }} /> {/* For alignment */}
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'mobile' && styles.tabActive,
            ]}
            onPress={() => {
              setActiveTab('mobile');
              setIsAddingNew(false);
            }}
          >
            <FontAwesome name="mobile-phone" size={20} color={activeTab === 'mobile' ? '#3498db' : '#888'} />
            <Text style={[styles.tabText, activeTab === 'mobile' && styles.tabTextActive]}>
              Mobile Money
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.tab,
              activeTab === 'bank' && styles.tabActive,
            ]}
            onPress={() => {
              setActiveTab('bank');
              setIsAddingNew(false);
            }}
          >
            <MaterialIcons name="account-balance" size={20} color={activeTab === 'bank' ? '#3498db' : '#888'} />
            <Text style={[styles.tabText, activeTab === 'bank' && styles.tabTextActive]}>
              Bank Accounts
            </Text>
          </TouchableOpacity>
        </View>

        {/* Existing Payment Methods */}
        {!isAddingNew && (
          <>
            {paymentMethods
              .filter(method => method.type === activeTab)
              .map(renderPaymentMethod)}
            
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setIsAddingNew(true)}
            >
              <Ionicons name="add" size={24} color="#3498db" />
              <Text style={styles.addButtonText}>
                Add {activeTab === 'mobile' ? 'Mobile Money' : 'Bank Account'}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {/* Add New Payment Method Form */}
        {isAddingNew && renderAddPaymentForm()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginHorizontal: 20,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#3498db',
  },
  tabText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#888',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#3498db',
  },
  paymentMethodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  paymentMethodIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  paymentMethodInfo: {
    flex: 1,
  },
  paymentMethodTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 3,
  },
  paymentMethodDetails: {
    fontSize: 14,
    color: '#666',
  },
  defaultBadge: {
    backgroundColor: '#e8f4fc',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 15,
  },
  defaultBadgeText: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '500',
  },
  makeDefaultButton: {
    marginRight: 15,
  },
  makeDefaultText: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '500',
  },
  removeButton: {
    padding: 5,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#3498db',
    borderStyle: 'dashed',
  },
  addButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#3498db',
    fontWeight: '500',
  },
  addPaymentForm: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    fontWeight: '500',
  },
  providerOptions: {
    marginBottom: 20,
  },
  providerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'relative',
  },
  providerOptionSelected: {
    borderColor: '#3498db',
    backgroundColor: '#f5faff',
  },
  providerIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  providerName: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  selectedIndicator: {
    backgroundColor: '#3498db',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  formButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e74c3c',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#3498db',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginLeft: 10,
  },
  saveButtonDisabled: {
    backgroundColor: '#a0c4e4',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default PaymentMethodsScreen;