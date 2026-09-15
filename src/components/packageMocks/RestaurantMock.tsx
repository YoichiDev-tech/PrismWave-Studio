import BrowserChrome from "../Badge";

export default function RestaurantMock() {
  return (
    <BrowserChrome bg="#10182b">
      <div className="flex h-full flex-col p-5 text-paper">
        <p className="font-mono text-[9px] uppercase tracking-widest text-paper/50">
          Osteria Bramante — Tonight
        </p>
        <h4 className="mt-2 font-display text-xl font-semibold">Today's Menu</h4>
        <div className="mt-3 flex-1 space-y-2 text-[10px]">
          {[
            ["Tagliatelle al ragù", "€14"],
            ["Branzino al forno", "€19"],
            ["Tiramisù", "€7"],
          ].map(([item, price]) => (
            <div key={item} className="flex items-center justify-between border-b border-white/10 pb-1.5">
              <span className="text-paper/80">{item}</span>
              <span className="font-mono" style={{ color: "#FF7A59" }}>
                {price}
              </span>
            </div>
          ))}
        </div>
        <span
          className="mt-3 inline-block rounded-full px-3 py-1.5 text-center font-display text-[10px] font-semibold text-white"
          style={{ background: "#FF7A59" }}
        >
          Reserve a Table
        </span>
      </div>
    </BrowserChrome>
  );
}