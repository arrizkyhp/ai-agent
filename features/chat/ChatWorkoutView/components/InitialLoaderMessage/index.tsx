// !TODO: Change this to skeleton loader tools Fitness Profile

const InitialLoaderMessage = () => (
  <div className="flex gap-3">
    <div className="flex-1">
      <div className="flex flex-col gap-2 mt-2">
        <div className="text-sm text-muted-foreground italic">
          Analyzing your fitness profile, please wait...
        </div>
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
  </div>
);

export default InitialLoaderMessage;
