import { Machine } from '../data/machines';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface MachineSelectorProps {
    machines: Machine[];
    selectedMachine: Machine | null;
    onSelect: (machine: Machine) => void;
    onContinue: () => void;
}

const MachineSelector = ({ machines, selectedMachine, onSelect, onContinue }: MachineSelectorProps) => {
    return (
        <div className="w-full max-w-2xl mx-auto space-y-6">
            <div className="space-y-4">
                {machines.map((machine) => {
                    const isSelected = selectedMachine?.id === machine.id;

                    return (
                        <div
                            key={machine.id}
                            onClick={() => onSelect(machine)}
                            className={`
                relative p-6 bg-white rounded-2xl cursor-pointer transition-all duration-300
                border-2 ${isSelected ? 'border-blue-600 shadow-xl shadow-blue-100 ring-2 ring-blue-100' : 'border-slate-100 hover:border-slate-200 hover:shadow-lg'}
              `}
                        >
                            <div className="flex items-start justify-between">
                                <div>
                                    <span className={`
                    text-xs font-bold tracking-wider uppercase px-2 py-1 rounded-full mb-2 inline-block
                    ${machine.brand === 'Ice Supply' ? 'bg-slate-100 text-slate-600' : 'bg-blue-50 text-blue-600'}
                  `}>
                                        {machine.brand}
                                    </span>
                                    <h3 className="text-lg font-bold text-slate-800">{machine.name}</h3>
                                </div>

                                <div className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                  ${isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}
                `}>
                                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                                </div>
                            </div>

                            {/* Reveal Details Panel */}
                            <div className={`
                overflow-hidden transition-all duration-500 ease-in-out
                ${isSelected ? 'max-h-48 opacity-100 mt-4' : 'max-h-0 opacity-0'}
              `}>
                                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <p className="text-slate-600 mb-2 text-sm leading-relaxed">
                                        {machine.description}
                                    </p>
                                    <p className="text-blue-700 font-medium text-sm flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                                        {machine.characteristic}
                                    </p>
                                </div>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onContinue();
                                    }}
                                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-transform active:scale-95 flex items-center justify-center gap-2"
                                >
                                    Continuar a Ubicación
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MachineSelector;
