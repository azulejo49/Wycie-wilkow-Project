import { useRef, useState, useEffect } from "react";
import Map, { MapRef, Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { DOMAINS } from "./constants";
import { cn } from "./lib/utils";
import { TerminalSquare, Activity, Menu, X } from "lucide-react";

type LogEntry = {
  id: string;
  timestamp: string;
  message: string;
};

export default function App() {
  const mapRef = useRef<MapRef>(null);
  const [activeDomainId, setActiveDomainId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<{
    domainId: string;
    description: string;
    recommendation: string;
    promptMsg: string;
  } | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [viewState, setViewState] = useState({
    longitude: 19.1451,
    latitude: 51.9194,
    zoom: 5.5,
    pitch: 0,
    bearing: 0
  });
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: "1", timestamp: "00:00:01", message: "> [SYS] Odrodzenie Central AI Initialized." },
    { id: "2", timestamp: "00:00:02", message: "> [SYS] Awaiting domain selection..." }
  ]);
  const logsEndRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string) => {
    const now = new Date();
    const timestamp = Math.floor(now.getTime() / 1000 % 100000).toString().padStart(6, '0');
    setLogs((prev) => [...prev, { id: Math.random().toString(36).substring(7), timestamp, message }]);
  };

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const handleDomainClick = (domain: typeof DOMAINS[0]) => {
    setActiveDomainId(domain.id);
    setPendingAction(null);
    setIsMobileSidebarOpen(false); // Close sidebar on selection
    addLog(`> [SYS] Redirecting orbital telemetry to ${domain.region} sector...`);
    addLog(`> [WARN] ${domain.description.split('.')[0]}.`);
    
    setTimeout(() => {
      setPendingAction({
        domainId: domain.id,
        description: domain.description,
        recommendation: domain.recommendation || "",
        promptMsg: domain.promptMsg || ""
      });
      addLog(`> [AI] Recommendation: ${domain.recommendation}`);
      addLog(`> [SYS] Prompting authorization...`);
    }, 2500);

    mapRef.current?.flyTo({
      center: domain.coordinates,
      zoom: 11,
      pitch: 45,
      bearing: 0,
      duration: 2000,
      essential: true,
    });
  };

  const handleActionProceed = () => {
    if (!pendingAction) return;
    addLog(`> [SYS] AUTHORIZED: Executing mitigation protocol...`);
    setTimeout(() => {
      addLog(`> [SYS] Protocol execution initiated for ${DOMAINS.find(d => d.id === pendingAction.domainId)?.name}.`);
      setPendingAction(null);
    }, 1000);
  };

  const handleActionAbort = () => {
    if (!pendingAction) return;
    addLog(`> [SYS] ABORTED: Mitigation protocol canceled by operator.`);
    setPendingAction(null);
  };

  return (
    <div className="w-full h-screen bg-slate-950 text-slate-200 font-sans relative overflow-hidden flex select-none">
      {/* Base Map */}
      <div className="absolute inset-0 z-0">
        <Map
          ref={mapRef}
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapStyle="https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json"
          interactiveLayerIds={[]}
          style={{ width: "100%", height: "100%" }}
        >
          {DOMAINS.map(domain => {
            const isActive = activeDomainId === domain.id;
            return (
              <Marker
                key={domain.id}
                longitude={domain.coordinates[0]}
                latitude={domain.coordinates[1]}
                anchor="center"
                onClick={(e) => {
                  e.originalEvent.stopPropagation();
                  handleDomainClick(domain);
                }}
              >
                <div 
                  className={cn(
                    "cursor-pointer transition-all",
                    isActive ? cn("w-6 h-6 rounded-full animate-pulse", domain.activeBullet, domain.activeShadow) : cn("w-3 h-3 rounded-full hover:scale-125 opacity-60 hover:opacity-100", domain.activeBullet)
                  )} 
                />
              </Marker>
            );
          })}
        </Map>
        {/* Radar Overlay Effect */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="absolute top-0 left-0 w-full h-px bg-emerald-500/20 shadow-[0_0_15px_#10b981] animate-pulse" style={{ top: "45%" }}></div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileSidebarOpen && (
        <div 
          className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 sm:hidden transition-opacity"
          onClick={() => setIsMobileSidebarOpen(false)}
        />
      )}

      {/* Left Sidebar - Glassmorphism */}
      <aside className={cn(
        "absolute sm:relative z-40 sm:z-10 w-80 max-w-[85vw] h-full bg-slate-900/95 sm:bg-slate-900/85 backdrop-blur-xl border-r border-slate-700 flex flex-col overflow-y-auto transition-transform duration-300",
        isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
      )}>
        {/* Mobile close button */}
        <button 
          className="absolute top-4 right-4 sm:hidden text-slate-400 p-2 hover:text-white"
          onClick={() => setIsMobileSidebarOpen(false)}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo Area */}
        <div className="p-6 border-b border-slate-800 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 120" width="100%" height="auto" className="drop-shadow-lg">
            <rect width="600" height="120" rx="18" fill="#0f172a"/>
            <g transform="translate(20,20) scale(0.15)">
              <path fill="#34d399" d="M255.563 22.094c-126.81 0-229.594 102.784-229.594 229.594 0 25.4 4.132 49.846 11.75 72.687 40.154-24.203 76.02-41.17 107.56-52.03-35.752 5.615-66.405 23.66-109.843 4 31.552-27.765 87.682-65.842 138.532-71.658 26.58-21.615 68.113-43.962 89.655-37.28 30.492-26.873 67.982-61.093 108.125-85.75 10.667 16.156 17.124 35.94 12.563 57.874-80.37 20.205-61.692 148.928 13.468 67.44 6.348 13.064 9.41 26.665 9.095 41.436-32.675 33.83-66.97 63.026-101.938 87.906.466 23.99-5.605 52.915-19 84.813-5.635 13.42-7.33 36.406 22.875 53.97 101.14-24.012 176.375-114.924 176.375-223.408 0-126.81-102.815-229.593-229.625-229.593zm3.312 164.375c-17.835 2.22-32.794 9.046-45.844 18.968 12.083-.036 25.612 2.882 37.5 6.156 6.208-6.698 10.236-18.52 8.345-25.125z"/>
            </g>
            <text x="120" y="65" fontFamily="Arial, sans-serif" fontSize="28" fill="white">Wycie-wilków</text>
            <text x="515" y="40" fontFamily="Arial, sans-serif" fontSize="14" fill="#9ca3af">™</text>
            <text x="120" y="90" fontFamily="Arial, sans-serif" fontSize="14" fill="#9ca3af">Odrodzenie-The Unified Polish Masterplan</text>
          </svg>
        </div>

        {/* Status Indicator */}
        <div className="px-6 py-4 flex items-center gap-3 bg-slate-800/40 border-y border-slate-700/50 shrink-0">
          <div className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-emerald-400 uppercase">Central AI: Online</span>
        </div>

        {/* Domain Buttons */}
        <nav className="flex-1 p-4 flex flex-col gap-3">
          <div className="text-[10px] uppercase tracking-widest text-slate-500 mb-2 px-2 flex items-center gap-2">
            <Activity className="w-3 h-3 text-slate-500" />
            Ecological Domains
          </div>
          {DOMAINS.map((domain, index) => {
            const isActive = activeDomainId === domain.id;
            return (
              <button
                key={domain.id}
                onClick={() => handleDomainClick(domain)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left group",
                  isActive
                    ? `${domain.activeBg} border ${domain.activeBorder} ${domain.activeText} hover:brightness-110`
                    : "hover:bg-slate-800 border border-transparent"
                )}
              >
                {isActive ? (
                  <span className={cn("w-2 h-2 rounded-full flex-shrink-0", domain.activeBullet, domain.activeShadow)}></span>
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-600 flex-shrink-0"></span>
                )}
                
                <domain.icon className={cn("w-4 h-4 flex-shrink-0", isActive ? domain.color : "text-slate-500 opacity-70")} />

                <div className="flex-1 flex flex-col items-start min-w-0">
                  <span className={cn(
                    "font-medium text-sm truncate w-full",
                    isActive ? domain.activeText : "text-slate-400"
                  )}>
                    {index + 1}. {domain.name}
                  </span>
                  <span className="text-[10px] font-mono opacity-50 mt-0.5 truncate w-full">
                     {domain.region}
                  </span>
                  {isActive && domain.description && (
                    <div className={cn("mt-3 text-[10px] normal-case leading-relaxed border-t pt-2 opacity-80", domain.activeText, domain.activeBorder)}>
                      {domain.description}
                    </div>
                  )}
                </div>

                {isActive ? (
                  <span className={cn("text-[10px] font-mono opacity-70 ml-auto flex-shrink-0 self-start mt-1", domain.color)}>
                    [Active]
                  </span>
                ) : (
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-auto flex-shrink-0">
                    <span className="text-[10px] font-mono text-slate-400 tracking-widest bg-slate-900 border border-slate-700 px-2 py-1 rounded">INIT</span>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Stats Footer */}
        <div className="p-6 border-t border-slate-800 space-y-4 bg-slate-950/20 shrink-0">
          <div>
            <div className="flex justify-between text-[10px] text-slate-500 mb-1">
              <span>CO2 ABSORPTION</span>
              <span className={cn(activeDomainId ? DOMAINS.find(d => d.id === activeDomainId)?.color : "text-emerald-400")}>
                {activeDomainId ? DOMAINS.find(d => d.id === activeDomainId)?.metrics?.co2 : "88.4%"}
              </span>
            </div>
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className={cn("h-full transition-all duration-1000", activeDomainId ? DOMAINS.find(d => d.id === activeDomainId)?.activeBullet : "bg-emerald-500")}
                style={{ width: activeDomainId ? DOMAINS.find(d => d.id === activeDomainId)?.metrics?.co2 : "88.4%" }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className={cn("text-lg font-mono", activeDomainId ? DOMAINS.find(d => d.id === activeDomainId)?.color : "text-emerald-400")}>
                {activeDomainId ? DOMAINS.find(d => d.id === activeDomainId)?.metrics?.nodes : 412}
              </div>
              <div className="text-[9px] uppercase tracking-tighter text-slate-500">Active Nodes</div>
            </div>
            <div className="text-center">
              <div className={cn("text-lg font-mono", activeDomainId ? DOMAINS.find(d => d.id === activeDomainId)?.color : "text-emerald-400")}>
                {activeDomainId ? DOMAINS.find(d => d.id === activeDomainId)?.metrics?.flux : "12TB/s"}
              </div>
              <div className="text-[9px] uppercase tracking-tighter text-slate-500">Bio-Data Flux</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main HUD Layer & Mobile Toggle */}
      <div className="absolute top-6 left-6 sm:left-[340px] flex gap-2 sm:gap-6 z-20 pointer-events-auto">
        <button 
          className="px-3 py-2 bg-slate-900/80 backdrop-blur border border-slate-700 rounded text-slate-300 hover:text-white hover:bg-slate-800 sm:hidden flex items-center justify-center transition-colors shadow-lg"
          onClick={() => setIsMobileSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="px-3 sm:px-4 py-2 bg-slate-900/60 backdrop-blur border border-slate-700 rounded text-xs font-mono hidden min-[400px]:block">
          LAT: <span className="text-emerald-400">{viewState.latitude.toFixed(4)}° N</span>
        </div>
        <div className="px-3 sm:px-4 py-2 bg-slate-900/60 backdrop-blur border border-slate-700 rounded text-xs font-mono hidden min-[400px]:block">
          LNG: <span className="text-emerald-400">{viewState.longitude.toFixed(4)}° E</span>
        </div>
      </div>

      {/* Decorative HUD Corner elements */}
      <div className="absolute top-0 right-0 p-4 z-20 pointer-events-none hidden sm:block">
        <div className="flex flex-col items-end gap-1 opacity-40">
          <div className="w-12 h-1 bg-emerald-500"></div>
          <div className="w-1 h-12 bg-emerald-500"></div>
        </div>
      </div>

      {/* Right Terminal - Cyber Theme */}
      <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:bottom-6 sm:right-6 z-20 sm:w-[420px] max-w-full bg-black/90 border border-emerald-500/20 shadow-2xl overflow-hidden flex flex-col rounded-sm">
        {/* Terminal Header */}
        <div className="px-3 py-1 bg-emerald-500/10 border-b border-emerald-500/20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TerminalSquare className="w-3.5 h-3.5 text-emerald-500 opacity-70" />
            <span className="text-[10px] font-mono text-emerald-500 tracking-widest uppercase">LIVE_TELEMETRY_FEED.EXE</span>
          </div>
          <div className="flex gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-900"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-900"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
          </div>
        </div>
        
        {/* Terminal Body */}
        <div className="h-40 sm:h-48 overflow-y-auto p-3 sm:p-4 font-mono text-[10px] sm:text-[11px] leading-relaxed flex flex-col gap-1.5 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-emerald-900/50 [&::-webkit-scrollbar-track]:bg-transparent">
          {logs.map((log) => (
            <div key={log.id} className="flex gap-2 text-emerald-400/90">
              <span className="text-emerald-700 shrink-0">[{log.timestamp}]</span>
              <span className="break-words">{log.message}</span>
            </div>
          ))}
          <div ref={logsEndRef} />
          {/* Action Prompt */}
          {pendingAction && (
            <div className="mt-4 border-t border-emerald-500/20 pt-3 flex flex-col gap-3">
              <div className="bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-sm">
                <div className="text-emerald-300 font-bold mb-1.5 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 motion-safe:animate-pulse"></span>
                  MITIGATION REQUIRED
                </div>
                <div className="text-emerald-100/90 text-[10px] leading-relaxed mb-2 opacity-90">
                  {pendingAction.recommendation}
                </div>
                <div className="text-emerald-400 flex items-center gap-2 mb-2 font-bold">
                  <span>?</span> {pendingAction.promptMsg}
                </div>
                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={handleActionProceed}
                    className="flex-1 py-1.5 px-3 bg-emerald-500/20 hover:bg-emerald-500/40 border border-emerald-500 text-emerald-100 transition-colors uppercase tracking-widest text-[9px] font-bold cursor-pointer"
                  >
                    [Y] Proceed
                  </button>
                  <button 
                    onClick={handleActionAbort}
                    className="flex-1 py-1.5 px-3 bg-red-500/10 hover:bg-red-500/30 border border-red-500/50 text-red-300 transition-colors uppercase tracking-widest text-[9px] font-bold cursor-pointer"
                  >
                    [N] Abort
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Blinking cursor */}
          {!pendingAction && (
            <div className="flex gap-2 text-emerald-400 mt-1">
              <span className="text-emerald-700 shrink-0">[{Math.floor(Date.now() / 1000 % 100000).toString().padStart(6, '0')}]</span>
              <span className="animate-pulse inline-block w-2 h-3 bg-emerald-500 align-middle"></span>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
