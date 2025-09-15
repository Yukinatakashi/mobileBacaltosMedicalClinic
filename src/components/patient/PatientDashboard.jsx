import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  StyleSheet,
  Dimensions,
  Alert,
  Platform,
  StatusBar
} from 'react-native';
import { 
  Calendar,
  Heart,
  Activity,
  Clock,
  User,
  Bell,
  MapPin,
  Phone,
  FileText,
  Pill,
  TrendingUp,
  ChevronRight,
  Star,
  Shield,
  MessageCircle,
  LogOut
} from 'lucide-react-native';
import { supabase } from '../../services/supabasefrontend';

const { width, height } = Dimensions.get('window');

// Get status bar height for different devices
const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {
    // iPhone X and newer have different status bar heights
    if (height >= 812) {
      return 44; // iPhone X, XS, XR, 11, 12, 13, 14, 15 series
    } else {
      return 20; // Older iPhones
    }
  } else if (Platform.OS === 'android') {
    return StatusBar.currentHeight || 24; // Android status bar height
  } else if (Platform.OS === 'web') {
    return 0; // Web doesn't have a status bar
  }
  return 24; // Default fallback
};

// Get responsive padding based on device type
const getResponsivePadding = () => {
  if (Platform.OS === 'web') {
    return 16; // Web padding
  } else if (width < 375) {
    return 16; // Small phones
  } else if (width < 414) {
    return 20; // Medium phones
  } else {
    return 24; // Large phones and tablets
  }
};

export default function PatientDashboard({ route, navigation }) {
  const { user } = route.params || {};
  const [greeting, setGreeting] = useState('Good Morning');
  const [patientName, setPatientName] = useState('Patient');
  const statusBarHeight = getStatusBarHeight();
  const responsivePadding = getResponsivePadding();

  // Helper function to get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Helper function to extract name from email
  const getNameFromEmail = (email) => {
    if (!email) return 'Patient';
    const name = email.split('@')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  // Helper function to get role-based subtitle
  const getRoleBasedSubtitle = (role) => {
    switch (role) {
      case 'patient':
        return 'How are you feeling today?';
      case 'doctor':
        return 'Ready to help your patients?';
      case 'admin':
        return 'Manage your healthcare system';
      default:
        return 'Welcome to your dashboard!';
    }
  };

  // Logout function with web compatibility
  const handleLogout = () => {
    // Use native confirm for web, Alert for mobile
    const confirmLogout = () => {
      if (Platform.OS === 'web') {
        return window.confirm('Are you sure you want to logout?');
      } else {
        return new Promise((resolve) => {
          Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
              {
                text: 'Cancel',
                style: 'cancel',
                onPress: () => resolve(false),
              },
              {
                text: 'Logout',
                style: 'destructive',
                onPress: () => resolve(true),
              },
            ]
          );
        });
      }
    };

    const performLogout = async () => {
      try {
        // Sign out from Supabase
        const { error } = await supabase.auth.signOut();
        
        if (error) {
          console.error('Logout error:', error.message);
          const errorMessage = 'There was an error logging out. Please try again.';
          if (Platform.OS === 'web') {
            alert(errorMessage);
          } else {
            Alert.alert('Logout Error', errorMessage);
          }
          return;
        }

        // Additional cleanup for web
        if (Platform.OS === 'web') {
          // Clear any additional web storage if needed
          try {
            localStorage.removeItem('user_session');
            sessionStorage.clear();
          } catch (e) {
            console.log('Web storage cleanup completed');
          }
        }

        // Navigate back to login screen
        // Use replace for web compatibility, reset for mobile
        if (Platform.OS === 'web') {
          navigation.replace('Login');
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      } catch (err) {
        console.error('Logout error:', err);
        const errorMessage = 'There was an error logging out. Please try again.';
        if (Platform.OS === 'web') {
          alert(errorMessage);
        } else {
          Alert.alert('Logout Error', errorMessage);
        }
      }
    };

    // Handle confirmation based on platform
    if (Platform.OS === 'web') {
      if (confirmLogout()) {
        performLogout();
      }
    } else {
      confirmLogout().then((confirmed) => {
        if (confirmed) {
          performLogout();
        }
      });
    }
  };

  // Update greeting and name when component mounts or user changes
  useEffect(() => {
    if (user && user.email) {
      setPatientName(getNameFromEmail(user.email));
    } else {
      setPatientName('Patient');
    }
    setGreeting(getTimeBasedGreeting());
  }, [user]);

  const quickActions = [
    { icon: Calendar, title: 'Book Appointment', color: '#0ea5e9', bgColor: '#e0f2fe' },
    { icon: FileText, title: 'View Records', color: '#059669', bgColor: '#ecfdf5' },
    { icon: Pill, title: 'Medications', color: '#dc2626', bgColor: '#fef2f2' },
    { icon: MessageCircle, title: 'Chat Doctor', color: '#7c3aed', bgColor: '#f3e8ff' },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Emily Chen',
      specialty: 'Cardiologist',
      date: 'Today',
      time: '2:30 PM',
      type: 'Follow-up',
      avatar: '👩‍⚕️'
    },
    {
      id: 2,
      doctor: 'Dr. Michael Rodriguez',
      specialty: 'General Practice',
      date: 'Tomorrow',
      time: '10:00 AM',
      type: 'Checkup',
      avatar: '👨‍⚕️'
    },
  ];

  const healthMetrics = [
    { label: 'Heart Rate', value: '72', unit: 'bpm', trend: 'stable', color: '#dc2626' },
    { label: 'Blood Pressure', value: '120/80', unit: 'mmHg', trend: 'good', color: '#059669' },
    { label: 'Weight', value: '68', unit: 'kg', trend: 'down', color: '#0ea5e9' },
  ];

  const recentActivity = [
    { title: 'Lab Results Available', time: '2 hours ago', type: 'result' },
    { title: 'Medication Reminder', time: '4 hours ago', type: 'reminder' },
    { title: 'Appointment Confirmed', time: '1 day ago', type: 'appointment' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={[styles.header, { paddingTop: statusBarHeight + 20 }]}>
        <View style={styles.backgroundDecoration} />
        <View style={[styles.headerContent, { paddingHorizontal: responsivePadding }]}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>{greeting}, {patientName}! ✨</Text>
              <Text style={styles.headerSubtitle}>
                {getRoleBasedSubtitle(user?.role)}
              </Text>
              {user?.email && (
                <Text style={styles.userEmail}>
                  {user.email}
                </Text>
              )}
            </View>
            <View style={styles.headerButtons}>
              <TouchableOpacity style={styles.notificationButton}>
                <Bell size={24} color="#fff" />
                <View style={styles.notificationDot} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={handleLogout}
                {...(Platform.OS === 'web' && { title: 'Logout' })}
              >
                <LogOut size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../images/logo.jpg')} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      <View style={[styles.section, { paddingHorizontal: responsivePadding }]}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity key={index} style={styles.quickActionCard}>
              <View style={[styles.quickActionIcon, { backgroundColor: action.bgColor }]}>
                <action.icon size={24} color={action.color} />
              </View>
              <Text style={styles.quickActionTitle}>{action.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={[styles.section, { paddingHorizontal: responsivePadding }]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Health Summary</Text>
          <TouchableOpacity>
            <TrendingUp size={20} color="#0ea5e9" />
          </TouchableOpacity>
        </View>
        <View style={styles.healthMetricsContainer}>
          {healthMetrics.map((metric, index) => (
            <View key={index} style={styles.healthMetricCard}>
              <View style={styles.metricHeader}>
                <Text style={styles.metricLabel}>{metric.label}</Text>
                <View style={[styles.trendIndicator, { 
                  backgroundColor: metric.trend === 'good' || metric.trend === 'stable' ? '#ecfdf5' : '#fef2f2' 
                }]}>
                  <Text style={[styles.trendText, { 
                    color: metric.trend === 'good' || metric.trend === 'stable' ? '#059669' : '#dc2626' 
                  }]}>
                    {metric.trend}
                  </Text>
                </View>
              </View>
              <Text style={[styles.metricValue, { color: metric.color }]}>
                {metric.value}
                <Text style={styles.metricUnit}> {metric.unit}</Text>
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, { paddingHorizontal: responsivePadding }]}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          <TouchableOpacity>
            <ChevronRight size={20} color="#0ea5e9" />
          </TouchableOpacity>
        </View>
        {upcomingAppointments.map((appointment) => (
          <TouchableOpacity key={appointment.id} style={styles.appointmentCard}>
            <View style={styles.appointmentLeft}>
              <View style={styles.doctorAvatar}>
                <Text style={styles.avatarEmoji}>{appointment.avatar}</Text>
              </View>
              <View style={styles.appointmentInfo}>
                <Text style={styles.doctorName}>{appointment.doctor}</Text>
                <Text style={styles.specialty}>{appointment.specialty}</Text>
                <View style={styles.appointmentMeta}>
                  <Clock size={14} color="#64748b" />
                  <Text style={styles.appointmentTime}>
                    {appointment.date} • {appointment.time}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.appointmentType}>
              <Text style={styles.typeText}>{appointment.type}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.section, { paddingHorizontal: responsivePadding }]}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        {recentActivity.map((activity, index) => (
          <TouchableOpacity key={index} style={styles.activityItem}>
            <View style={styles.activityIcon}>
              {activity.type === 'result' && <FileText size={16} color="#059669" />}
              {activity.type === 'reminder' && <Pill size={16} color="#dc2626" />}
              {activity.type === 'appointment' && <Calendar size={16} color="#0ea5e9" />}
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              <Text style={styles.activityTime}>{activity.time}</Text>
            </View>
            <ChevronRight size={16} color="#94a3b8" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <View style={styles.healthTipCard}>
          <View style={styles.tipHeader}>
            <Heart size={20} color="#dc2626" />
            <Text style={styles.tipTitle}>Today's Health Tip</Text>
          </View>
          <Text style={styles.tipContent}>
            Remember to stay hydrated! Aim for 8 glasses of water throughout the day to keep your body functioning optimally.
          </Text>
          <TouchableOpacity style={styles.tipButton}>
            <Text style={styles.tipButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomSpacing} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#0ea5e9',
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
    minHeight: 200, // Ensure minimum header height
  },
  backgroundDecoration: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerContent: {
    paddingHorizontal: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  userEmail: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 4,
    fontStyle: 'italic',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  logoutButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(220, 38, 38, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(220, 38, 38, 0.3)',
    ...(Platform.OS === 'web' && {
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      ':hover': {
        backgroundColor: 'rgba(220, 38, 38, 0.3)',
        transform: 'scale(1.05)',
      },
    }),
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#dc2626',
  },
  logoContainer: {
    alignSelf: 'center',
    width: 60,
    height: 60,
    borderRadius: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: 45,
    height: 45,
    borderRadius: 12,
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
  healthMetricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  healthMetricCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  trendIndicator: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  metricValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  metricUnit: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '400',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  appointmentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  doctorAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarEmoji: {
    fontSize: 24,
  },
  appointmentInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  specialty: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  appointmentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appointmentTime: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  appointmentType: {
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 12,
    color: '#0ea5e9',
    fontWeight: '600',
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 2,
  },
  activityIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#64748b',
  },
  healthTipCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 6,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1e293b',
    marginLeft: 8,
  },
  tipContent: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  tipButton: {
    alignSelf: 'flex-start',
    backgroundColor: '#fef2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tipButtonText: {
    fontSize: 12,
    color: '#dc2626',
    fontWeight: '600',
  },
  bottomSpacing: {
    height: 24,
  },
});