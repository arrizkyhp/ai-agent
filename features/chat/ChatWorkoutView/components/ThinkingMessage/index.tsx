const ThinkingMessage = () => (
  <div className="flex gap-3 py-8" style={{ minHeight: "calc(100vh - 200px)"}}>
    <div className="flex-1 flex flex-col gap-2 ">
      <div className="flex justify-start space-x-2 pt-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-primary/70 animate-pulse"
            style={{
              animationDelay: `${i * 300}ms`,
              animationDuration: "1.5s",
            }}
          />
        ))}
      </div>
    </div>
  </div>
);

export default ThinkingMessage;
