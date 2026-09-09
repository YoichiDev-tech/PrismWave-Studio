

        <StatusBadge />
      </header>

      {/* Hero Screenshot */}
      <section className="px-6 pb-20">
        <ReceiptFrame label="servesync.app">
          <div className="flex aspect-[16/10] items-center justify-center bg-[color:var(--color-steam,#EDE7DD)] font-mono text-xs opacity-50">
            <img
              src="/images/serve-sync/servesync.jpg"
              alt="ServeSync homepage screenshot"
              className="w-auto h-auto object-cover"
              loading="lazy"
            />
          </div>

  );
}

function RoadmapItem({
  status,
  children,
}: {
  status: "next" | "later";
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-center gap-3">
      <span
        className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide ${
          status === "next" ? "opacity-100" : "opacity-50"
        }`}
      >
        {status}
      </span>
      <span className="opacity-90">{children}</span>
    </li>
  );
}