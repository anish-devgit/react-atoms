import GradientText from "@/components/ui/GradientText";

export default function GradientTextDemo() {
    return (
        <div className="flex items-center justify-center min-h-[400px] p-8">
            <GradientText
                text="Animated Gradient"
                className="text-5xl font-bold"
                colors={["#ff0080", "#7928ca", "#ff0080"]}
                animationSpeed={3}
                animationDirection="horizontal"
            />
        </div>
    );
}
