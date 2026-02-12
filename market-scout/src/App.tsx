import { useState } from 'react';
import { MACHINES, Machine } from './data/machines';
import MachineSelector from './components/MachineSelector';
import LocationInput from './components/LocationInput';
import MapScanner from './components/MapScanner';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import './index.css';

type Step = 'machine' | 'location' | 'map';

function App() {
  const [step, setStep] = useState<Step>('machine');
  const [selectedMachine, setSelectedMachine] = useState<Machine | null>(null);
  const [location, setLocation] = useState<{ lat: number; lon: number; address: string } | null>(null);

  const handleMachineContinue = () => {
    if (selectedMachine) setStep('location');
  };

  const handleLocationSelected = (lat: number, lon: number, address: string) => {
    setLocation({ lat, lon, address });
    setStep('map');
  };

  const handleReset = () => {
    setStep('machine');
    setSelectedMachine(null);
    setLocation(null);
  };

  const handleBack = () => {
    if (step === 'location') setStep('machine');
    if (step === 'map') setStep('location');
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100/50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            {step !== 'machine' && (
              <button
                onClick={handleBack}
                className="p-2 rounded-full hover:bg-slate-200 transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-slate-600" />
              </button>
            )}
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                Market Scout
              </h1>
              <p className="text-sm md:text-base text-slate-500 font-medium">
                {step === 'machine' && "1. Elige tu Modelo"}
                {step === 'location' && "2. Define Ubicación"}
                {step === 'map' && "3. Análisis de Mercado"}
              </p>
            </div>
          </div>

          {step !== 'machine' && (
            <button
              onClick={handleReset}
              className="p-2 rounded-full hover:bg-red-50 text-red-500 transition-colors"
              title="Reiniciar"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          )}
        </header>

        {/* Dynamic Content */}
        <main className="transition-all duration-500 ease-in-out">
          {step === 'machine' && (
            <div className="animate-fade-in space-y-8">
              <h2 className="text-2xl font-bold text-slate-800 text-center">
                ¿Qué negocio quieres analizar hoy?
              </h2>
              <MachineSelector
                machines={MACHINES}
                selectedMachine={selectedMachine}
                onSelect={setSelectedMachine}
                onContinue={handleMachineContinue}
              />
            </div>
          )}

          {step === 'location' && (
            <div className="animate-fade-in space-y-8 max-w-lg mx-auto">
              <h2 className="text-2xl font-bold text-slate-800 text-center">
                ¿Dónde planeas instalarlo?
              </h2>
              <LocationInput
                onLocationSelected={handleLocationSelected}
                onError={(msg) => alert(msg)} // Simple alert for now, could be a toast
              />
            </div>
          )}

          {step === 'map' && selectedMachine && location && (
            <div className="animate-fade-in space-y-6">
              <div className="text-center mb-4">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Analizando
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-2">
                  {location.address.split(',')[0]}
                </h2>
                <p className="text-slate-500 text-sm">
                  {selectedMachine.name}
                </p>
              </div>

              <div className="rounded-3xl shadow-2xl overflow-hidden ring-4 ring-white">
                <MapScanner
                  lat={location.lat}
                  lon={location.lon}
                  machine={selectedMachine}
                  onReset={handleReset}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
