import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ChevronRight, BookOpen, Users, Award, Heart, Phone, Mail, Calendar } from 'lucide-react';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex items-center bg-yellow-400 text-gray-900 p-2 rounded-lg">
                <GraduationCap className="h-8 w-8" />
                <span className="ml-2 text-xl font-bold">511</span>
              </div>
              <h1 className="ml-3 text-2xl font-bold text-gray-900">College</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Link
                to="/management"
                className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors"
              >
                Gestión
              </Link>
              <Link
                to="/view"
                className="text-sm font-medium text-gray-700 hover:text-yellow-600 transition-colors"
              >
                Visualización
              </Link>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>+1 234 567 890</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>info@511college.com</span>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            Formando el Futuro de la Educación
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Brindamos una educación integral y de calidad para el desarrollo completo de nuestros estudiantes
          </p>
          <Link
            to="/management"
            className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-full text-white hover:bg-white hover:text-gray-900 transition-colors"
          >
            Comenzar Ahora
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">¿Por Qué Elegirnos?</h2>
            <p className="mt-4 text-lg text-gray-600">Descubre lo que hace única nuestra institución</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="feature-card">
              <BookOpen className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Educación Integral</h3>
              <p className="text-gray-600">
                Programas diseñados para desarrollar todas las capacidades de nuestros estudiantes
              </p>
            </div>
            <div className="feature-card">
              <Users className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Profesores Expertos</h3>
              <p className="text-gray-600">
                Equipo docente altamente calificado y comprometido con la excelencia
              </p>
            </div>
            <div className="feature-card">
              <Award className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Programas Certificados</h3>
              <p className="text-gray-600">
                Currículum aprobado por las principales instituciones educativas
              </p>
            </div>
            <div className="feature-card">
              <Heart className="h-12 w-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ambiente Seguro</h3>
              <p className="text-gray-600">
                Instalaciones modernas y seguras para el bienestar de los estudiantes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-4">
            <div className="stat-card">
              <span className="block text-4xl font-bold">15</span>
              <span className="text-sm">Años de Experiencia</span>
            </div>
            <div className="stat-card">
              <span className="block text-4xl font-bold">50+</span>
              <span className="text-sm">Profesores</span>
            </div>
            <div className="stat-card">
              <span className="block text-4xl font-bold">1000+</span>
              <span className="text-sm">Estudiantes</span>
            </div>
            <div className="stat-card">
              <span className="block text-4xl font-bold">95%</span>
              <span className="text-sm">Satisfacción</span>
            </div>
          </div>
        </div>
      </section>

      {/* Events */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">Próximos Eventos</h2>
            <p className="mt-4 text-lg text-gray-600">No te pierdas nuestras actividades especiales</p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="event-card">
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80"
                alt="Taller de Arte"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-yellow-500 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">15 de Marzo, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Taller de Arte</h3>
                <p className="text-gray-600">Explora tu creatividad en nuestro taller de arte mensual</p>
              </div>
            </div>
            <div className="event-card">
              <img
                src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80"
                alt="Día Deportivo"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-yellow-500 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">20 de Marzo, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Día Deportivo</h3>
                <p className="text-gray-600">Competencias deportivas y actividades al aire libre</p>
              </div>
            </div>
            <div className="event-card">
              <img
                src="https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&q=80"
                alt="Feria de Ciencias"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-yellow-500 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">25 de Marzo, 2024</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Feria de Ciencias</h3>
                <p className="text-gray-600">Exhibición de proyectos científicos de nuestros estudiantes</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}