import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import type { Student, Grade } from '../types';

export function ManagementView() {
  const [students, setStudents] = useState<Student[]>([]);
  const [newStudent, setNewStudent] = useState({ name: '', email: '' });
  const [newGrade, setNewGrade] = useState({ studentId: '', subject: '', score: '' });
  const [grades, setGrades] = useState<Grade[]>([]);
  const { signOut } = useAuth();

  useEffect(() => {
    fetchStudents();
    fetchGrades();
  }, []);

  async function fetchStudents() {
    const { data, error } = await supabase
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching students:', error);
      return;
    }
    
    setStudents(data);
  }

  async function fetchGrades() {
    const { data, error } = await supabase
      .from('grades')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching grades:', error);
      return;
    }
    
    setGrades(data);
  }

  async function handleAddStudent(e: React.FormEvent) {
    e.preventDefault();
    
    const { data, error } = await supabase
      .from('students')
      .insert([newStudent])
      .select();

    if (error) {
      console.error('Error adding student:', error);
      return;
    }

    setStudents([...students, data[0]]);
    setNewStudent({ name: '', email: '' });
    toast.success('Estudiante agregado exitosamente');
  }

  async function handleAddGrade(e: React.FormEvent) {
    e.preventDefault();
    
    const { data, error } = await supabase
      .from('grades')
      .insert([{
        student_id: newGrade.studentId,
        subject: newGrade.subject,
        score: parseFloat(newGrade.score)
      }])
      .select();

    if (error) {
      console.error('Error adding grade:', error);
      return;
    }

    setGrades([...grades, data[0]]);
    setNewGrade({ studentId: '', subject: '', score: '' });
    toast.success('Calificación agregada exitosamente');
  }

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Sesión cerrada exitosamente');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center bg-yellow-400 text-gray-900 p-2 rounded-lg">
                <GraduationCap className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold">511</span>
              </div>
              <h1 className="ml-3 text-3xl font-bold text-gray-900">
                Gestión de Estudiantes
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors"
              >
                Inicio
              </Link>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded-md hover:bg-yellow-700 transition-colors"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Add Student Form */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Agregar Nuevo Estudiante</h2>
            <form onSubmit={handleAddStudent} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Nombre"
                  value={newStudent.name}
                  onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newStudent.email}
                  onChange={e => setNewStudent({ ...newStudent, email: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Estudiante
              </button>
            </form>
          </div>

          {/* Add Grade Form */}
          <div className="bg-white shadow rounded-lg p-6 mb-6">
            <h2 className="text-lg font-medium mb-4">Agregar Calificación</h2>
            <form onSubmit={handleAddGrade} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <select
                  value={newGrade.studentId}
                  onChange={e => setNewGrade({ ...newGrade, studentId: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                >
                  <option value="">Seleccionar Estudiante</option>
                  {students.map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Materia"
                  value={newGrade.subject}
                  onChange={e => setNewGrade({ ...newGrade, subject: e.target.value })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
                <input
                  type="number"
                  placeholder="Calificación"
                  value={newGrade.score}
                  onChange={e => setNewGrade({ ...newGrade, score: e.target.value })}
                  min="0"
                  max="100"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring-yellow-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                <Plus className="h-4 w-4 mr-2" />
                Agregar Calificación
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}