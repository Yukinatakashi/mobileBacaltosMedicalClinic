import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  Image, 
  StyleSheet,
  Dimensions 
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
  MessageCircle
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function PatientDashboard() {
  const [greeting, setGreeting] = useState('Good Morning');
  const [patientName] = useState('Sarah');

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
      <View style={styles.header}>
        <View style={styles.backgroundDecoration} />
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>{greeting}, {patientName}! ✨</Text>
              <Text style={styles.headerSubtitle}>How are you feeling today?</Text>
            </View>
            <TouchableOpacity style={styles.notificationButton}>
              <Bell size={24} color="#fff" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
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

      <View style={styles.section}>
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

      <View style={styles.section}>
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

      <View style={styles.section}>
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

      <View style={styles.section}>
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
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    overflow: 'hidden',
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
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
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