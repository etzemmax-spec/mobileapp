import {
  AbsoluteFill,
  Composition,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const MyComposition = () => {
  return (
    <Composition
      id="MyComp"
      component={MyComponent}
      durationInFrames={120}
      fps={30}
      width={1280}
      height={720}
    />
  );
};

export const MyComponent: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12 } });
  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: "clamp",
  });
  const hue = interpolate(frame, [0, 120], [220, 300]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, hsl(${hue},70%,25%), hsl(${hue + 40},70%,45%))`,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "sans-serif",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: 120, margin: 0, transform: `scale(${scale})` }}>
        Hello, Remotion!
      </h1>
      <p style={{ fontSize: 40, opacity: subtitleOpacity }}>
        My first video, made with React
      </p>
    </AbsoluteFill>
  );
};
