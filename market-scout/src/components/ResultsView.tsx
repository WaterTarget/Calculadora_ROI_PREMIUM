import { type Machine } from '../data/machines';
import { getAnalysisResult } from '../utils/mockData';

import { Award, TrendingUp, MapPin, Phone, Mail, RefreshCw, CheckCircle2 } from 'lucide-react';

interface ResultsViewProps {
    machine: Machine;
    onStartOver: () => void;
}

const ResultsView = ({ machine, onStartOver }: ResultsViewProps) => {
    const mockMarkerCount = machine.mapLogic === 'hospitality' ? 6 : 5;
    const analysis = getAnalysisResult(machine.mapLogic, mockMarkerCount);

    const isB2B = machine.brand === 'Ice Supply';

    return (
        <div className="max-w-5xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-cyan-500/20 rounded-full mb-4">
                    <Award className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-semibold">Análisis Completado</span>
                </div>
                <h2 className="text-4xl font-bold text-white mb-3">
                    Análisis para {machine.name}
                </h2>
                <p className="text-gray-400 text-lg">
                    {machine.brand} - Reporte de Viabilidad de Ubicación
                </p>
            </div>

            {/* Veredicto Card */}
            <div className="glass-effect rounded-xl p-8 mb-6 border-2 border-green-400/30">
                <div className="flex items-start gap-4 mb-6">
                    <div className="bg-gradient-to-br from-green-500 to-cyan-600 p-4 rounded-xl flex-shrink-0">
                        <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            {analysis.title}
                        </h3>
                        <p className="text-xl text-green-400 font-semibold">
                            {analysis.message}
                        </p>
                    </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-cyan-400/20">
                    <p className="text-gray-300 leading-relaxed">
                        {analysis.recommendation}
                    </p>
                </div>
            </div>

            {/* Key Insights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="glass-effect rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-cyan-500/20 p-3 rounded-lg">
                            <MapPin className="w-6 h-6 text-cyan-400" />
                        </div>
                        <h4 className="text-lg font-bold text-white">Ubicación Estratégica</h4>
                    </div>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-gray-300">
                            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>Alto tráfico peatonal y vehicular</span>
                        </li>
                        <li className="flex items-start gap-2 text-gray-300">
                            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>Visibilidad desde vías principales</span>
                        </li>
                        <li className="flex items-start gap-2 text-gray-300">
                            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>Acceso 24/7 sin restricciones</span>
                        </li>
                    </ul>
                </div>

                <div className="glass-effect rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="bg-primary-500/20 p-3 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-primary-400" />
                        </div>
                        <h4 className="text-lg font-bold text-white">Potencial de Mercado</h4>
                    </div>
                    <ul className="space-y-2">
                        <li className="flex items-start gap-2 text-gray-300">
                            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{isB2B ? 'Clientes B2B con alto consumo' : 'Demanda constante en la zona'}</span>
                        </li>
                        <li className="flex items-start gap-2 text-gray-300">
                            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>{isB2B ? 'Oportunidad de contratos recurrentes' : 'Competencia moderada'}</span>
                        </li>
                        <li className="flex items-start gap-2 text-gray-300">
                            <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                            <span>ROI estimado en 12-18 meses</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Machine Details */}
            <div className="glass-effect rounded-xl p-6 mb-8">
                <h4 className="text-xl font-bold text-white mb-4">Detalles del Equipo</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Modelo Seleccionado</p>
                        <p className="text-lg font-semibold text-white">{machine.name}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400 mb-1">Marca</p>
                        <p className="text-lg font-semibold text-cyan-400">{machine.brand}</p>
                    </div>
                    <div className="md:col-span-2">
                        <p className="text-sm text-gray-400 mb-2">Descripción</p>
                        <p className="text-white">{machine.description}</p>
                    </div>
                    <div className="md:col-span-2 bg-cyan-500/10 border border-cyan-400/30 rounded-lg p-4">
                        <p className="text-sm font-semibold text-cyan-400 mb-1">Característica Destacada</p>
                        <p className="text-white">{machine.characteristic}</p>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="glass-effect rounded-xl p-8 text-center border-2 border-cyan-400/30">
                <h3 className="text-2xl font-bold text-white mb-3">
                    ¿Listo para dar el siguiente paso?
                </h3>
                <p className="text-gray-300 mb-6">
                    Nuestros asesores especializados te ayudarán a concretar tu inversión
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                    <a
                        href={`tel:+525512345678`}
                        className="group px-8 py-4 bg-gradient-to-r from-green-500 to-cyan-600 hover:from-green-600 hover:to-cyan-700 text-white rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/30 flex items-center justify-center gap-3"
                    >
                        <Phone className="w-6 h-6" />
                        {analysis.cta}
                    </a>

                    <a
                        href="mailto:ventas@marketscout.com"
                        className="px-8 py-4 glass-effect hover:bg-white/10 text-white rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 border border-white/20"
                    >
                        <Mail className="w-6 h-6" />
                        Enviar Email
                    </a>
                </div>

                <button
                    onClick={onStartOver}
                    className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2 mx-auto transition-colors"
                >
                    <RefreshCw className="w-5 h-5" />
                    Analizar otra ubicación
                </button>
            </div>

            {/* Footer Note */}
            <div className="mt-6 text-center">
                <p className="text-gray-500 text-sm">
                    * Este análisis es una evaluación preliminar. Para un estudio detallado, contacta a nuestro equipo.
                </p>
            </div>
        </div>
    );
};

export default ResultsView;
