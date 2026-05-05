import { Visualizer } from './components/Visualizer';
import { Controls } from './components/Controls';
import { AnalogyPanel } from './components/AnalogyPanel';
import { ComplexityPanel } from './components/ComplexityPanel';
import { Quiz } from './components/Quiz';
import { InputSystem } from './components/InputSystem';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans selection:bg-blue-500/30">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-slate-800/40 border border-slate-700/50 rounded-lg text-white shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 32 32">
                  <rect x="4" y="14" width="6" height="14" rx="1" fill="#3b82f6" />
                  <rect x="13" y="6" width="6" height="22" rx="1" fill="#10b981" />
                  <rect x="22" y="10" width="6" height="18" rx="1" fill="#f59e0b" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Merge Sort <span className="text-blue-600 dark:text-blue-500">Visualizer</span>
              </h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl text-lg">
              Master the divide-and-conquer algorithm through step-by-step interactive visualization and real-world analogies.
            </p>
          </div>
          <div className="w-full md:w-auto md:min-w-[400px]">
             <InputSystem />
          </div>
        </header>

        {/* Main Workspace */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 flex flex-col gap-6">
            {/* Visualizer Area */}
            <section className="bg-white dark:bg-slate-900 p-2 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
              <Visualizer />
            </section>
            
            {/* Controls */}
            <section>
              <Controls />
            </section>
          </div>

          <div className="lg:col-span-1">
            {/* Analogy & Phase Panel */}
            <AnalogyPanel />
          </div>
        </main>

        {/* Bottom Educational Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
          <section>
            <ComplexityPanel />
          </section>
          <section>
            <Quiz />
          </section>
        </div>

      </div>
    </div>
  );
}

export default App;
