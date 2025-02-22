import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import type { Student, Grade } from '../types';

export function ViewMode() {
  const [students, setStudents] = useState<Student[]>([]);
  const [grades, setGrades] = useState<Grade[]>([]);

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
                Visualización de Datos
              </h1>
            </div>
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Students List */}
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg font-medium">Lista de Estudiantes y Calificaciones</h3>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {students.map(student => (
                  <li key={student.id} className="px-4 py-4">
                    <div>
                      <h4 className="text-lg font-medium">{student.name}</h4>
                      <p className="text-gray-600">{student.email}</p>
                      {/* Display grades for this student */}
                      <div className="mt-2">
                        {grades
                          .filter(grade => grade.student_id === student.id)
                          .map(grade => (
                            <span
                              key={grade.id}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2 mb-2"
                            >
                              {grade.subject}: {grade.score}
                            </span>
                          ))
                        }
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}