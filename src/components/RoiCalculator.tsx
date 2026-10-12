import { useState, type FC } from 'react';
import { Calculator, Clock, DollarSign, ArrowRight, Sparkles } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenContactWithValues?: (data: { employees: number; hoursSaved: number; savings: number }) => void;
}

export const RoiCalculator: FC<RoiCalculatorProps> = ({ onOpenContactWithValues }) => {
  const [employees, setEmployees] = useState(12);
  const [manualHoursPerWeek, setManualHoursPerWeek] = useState(14);
  const [hourlyCost, setHourlyCost] = useState(45);

  const automationEfficiencyFactor = 0.7;
  const hoursSavedPerEmployeePerWeek = manualHoursPerWeek * automationEfficiencyFactor;
  const totalHoursSavedPerMonth = Math.round(employees * hoursSavedPerEmployeePerWeek * 4.33);
  const monthlySavings = Math.round(totalHoursSavedPerMonth * hourlyCost);
  const annualSavings = monthlySavings * 12;

  return (
    <section id="simulador" className="py-24 relative bg-white border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1F5F9] border border-[#CBD5E1] text-xs font-mono font-bold text-[#1E2E4A] uppercase tracking-widest">
            <Calculator className="w-3.5 h-3.5 text-[#EAB308]" />
            Simulador de Eficiência Operacional
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A1128] tracking-tight">
            Calcule o Retorno da Automação no seu Negócio
          </h2>

          <p className="text-base text-[#52667D]">
            Ajuste os parâmetros da sua equipe e visualize quanto tempo e recursos podem ser redirecionados para atividades estratégicas e vendas.
          </p>
        </div>

        {/* Calculator Container */}
        <div className="rounded-2xl bg-[#FFFFFF] p-6 sm:p-10 border border-[#CBD5E1] shadow-card grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Input 1: Employees */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-[#0A1128]">
                  Colaboradores na equipe operacional / comercial:
                </label>
                <span className="px-3 py-1 rounded-lg bg-[#F1F5F9] text-[#0A1128] font-mono font-bold text-sm border border-[#CBD5E1]">
                  {employees} pessoas
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="120"
                step="1"
                value={employees}
                onChange={(e) => setEmployees(Number(e.target.value))}
                className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#0A1128]"
              />
              <div className="flex justify-between text-[11px] text-[#52667D] font-mono">
                <span>2 pessoas</span>
                <span>60 pessoas</span>
                <span>120+ pessoas</span>
              </div>
            </div>

            {/* Input 2: Manual hours */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-[#0A1128]">
                  Horas gastas por colaborador em tarefas manuais/semana:
                </label>
                <span className="px-3 py-1 rounded-lg bg-[#F1F5F9] text-[#0A1128] font-mono font-bold text-sm border border-[#CBD5E1]">
                  {manualHoursPerWeek} horas / sem
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="30"
                step="1"
                value={manualHoursPerWeek}
                onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
                className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#0A1128]"
              />
              <div className="flex justify-between text-[11px] text-[#52667D] font-mono">
                <span>4h (Pouco atrito)</span>
                <span>16h (Moderado)</span>
                <span>30h (Gargalo crítico)</span>
              </div>
            </div>

            {/* Input 3: Hourly Cost */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-[#0A1128]">
                  Custo médio por hora trabalhada (salário + encargos):
                </label>
                <span className="px-3 py-1 rounded-lg bg-[#F1F5F9] text-[#0A1128] font-mono font-bold text-sm border border-[#CBD5E1]">
                  R$ {hourlyCost},00 / h
                </span>
              </div>
              <input
                type="range"
                min="20"
                max="150"
                step="5"
                value={hourlyCost}
                onChange={(e) => setHourlyCost(Number(e.target.value))}
                className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#0A1128]"
              />
              <div className="flex justify-between text-[11px] text-[#52667D] font-mono">
                <span>R$ 20/h</span>
                <span>R$ 80/h</span>
                <span>R$ 150/h</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs text-[#52667D] flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#EAB308] flex-shrink-0" />
              <span>
                Cálculo calibrado com índice conservador de 70% de tarefas eliminadas via Metrys Flow e Metrys AI.
              </span>
            </div>

          </div>

          {/* Results Card Column (5 cols) */}
          <div className="lg:col-span-5 bg-[#F8FAFC] p-7 rounded-2xl border border-[#CBD5E1] shadow-card space-y-6">
            <div className="border-b border-[#E2E8F0] pb-4">
              <span className="text-xs font-mono font-bold text-[#52667D] uppercase tracking-wider block">
                RESULTADO ESTIMADO
              </span>
              <h3 className="text-xl font-black text-[#0A1128] mt-1">
                Ganhos de Produtividade
              </h3>
            </div>

            <div className="space-y-4">
              {/* Stat 1: Hours Saved */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-[#2A4365]" />
                  <span className="text-xs sm:text-sm font-semibold text-[#52667D]">Tempo poupado no mês</span>
                </div>
                <span className="text-lg font-mono font-black text-[#0A1128]">
                  {totalHoursSavedPerMonth.toLocaleString('pt-BR')} horas
                </span>
              </div>

              {/* Stat 2: Monthly Financial Impact */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#E2E8F0] shadow-sm">
                <div className="flex items-center gap-2.5">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs sm:text-sm font-semibold text-[#52667D]">Economia mensal</span>
                </div>
                <span className="text-lg font-mono font-black text-emerald-700">
                  R$ {monthlySavings.toLocaleString('pt-BR')}
                </span>
              </div>

              {/* Stat 3: Annualized Impact */}
              <div className="p-4 rounded-xl bg-[#0A1128] text-white">
                <span className="text-[11px] font-mono text-[#9FB2C8] uppercase tracking-wider block">
                  Potencial Anual Recorrente
                </span>
                <div className="text-2xl sm:text-3xl font-black text-white font-mono mt-1">
                  R$ {annualSavings.toLocaleString('pt-BR')}
                </div>
                <span className="text-[11px] text-[#CBD7E5] mt-1 block">
                  Em recursos liberados para expansão comercial.
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                onOpenContactWithValues?.({
                  employees,
                  hoursSaved: totalHoursSavedPerMonth,
                  savings: monthlySavings,
                })
              }
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider text-white bg-[#0A1128] hover:bg-[#1E2E4A] transition-all shadow-sm active:scale-95"
            >
              <span>Aplicar Esse Plano na Minha Empresa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
