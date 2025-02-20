interface MeasurementDisplayProps {
  measurements: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export default function MeasurementDisplay({ measurements }: MeasurementDisplayProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg border-t">
      <div className="max-w-3xl mx-auto grid grid-cols-4 gap-4">
        <div className="text-center">
          <div className="font-semibold">Top</div>
          <div>{measurements.top} mm</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">Bottom</div>
          <div>{measurements.bottom} mm</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">Left</div>
          <div>{measurements.left} mm</div>
        </div>
        <div className="text-center">
          <div className="font-semibold">Right</div>
          <div>{measurements.right} mm</div>
        </div>
      </div>
    </div>
  );
} 