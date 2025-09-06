// Sample database query functions
// This file demonstrates how to structure your database queries

// Example: Get all patients
export const getAllPatients = async () => {
  try {
    // This would typically use your database connection
    // For now, returning sample data
    const patients = [
      { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' }
    ];
    
    return { data: patients, error: null };
  } catch (error) {
    console.error('Error fetching patients:', error);
    return { data: null, error: error.message };
  }
};

// Example: Get patient by ID
export const getPatientById = async (id) => {
  try {
    // Sample implementation
    const patient = { id, name: 'Sample Patient', email: 'sample@example.com' };
    return { data: patient, error: null };
  } catch (error) {
    console.error('Error fetching patient:', error);
    return { data: null, error: error.message };
  }
};

// Example: Create new patient
export const createPatient = async (patientData) => {
  try {
    // Sample implementation
    const newPatient = { id: Date.now(), ...patientData };
    return { data: newPatient, error: null };
  } catch (error) {
    console.error('Error creating patient:', error);
    return { data: null, error: error.message };
  }
};

// Example: Update patient
export const updatePatient = async (id, updateData) => {
  try {
    // Sample implementation
    const updatedPatient = { id, ...updateData };
    return { data: updatedPatient, error: null };
  } catch (error) {
    console.error('Error updating patient:', error);
    return { data: null, error: error.message };
  }
};

// Example: Delete patient
export const deletePatient = async (id) => {
  try {
    // Sample implementation
    return { data: { id, deleted: true }, error: null };
  } catch (error) {
    console.error('Error deleting patient:', error);
    return { data: null, error: error.message };
  }
};
