import BlurText from "@/components/ui/BlurText";

export default function BlurTextDemo() {
    return (
        <div className="flex items-center justify-center min-h-[400px] p-8">
            <BlurText
                text="Blur in from nowhere"
                className="text-4xl font-bold text-white"
                direction="bottom"
                animateBy="word"
            />
        </div>
    );
}
