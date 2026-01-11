import SplitText from "@/components/ui/SplitText";

export default function SplitTextDemo() {
    return (
        <div className="flex items-center justify-center min-h-[400px] p-8">
            <SplitText
                text="Split text animation"
                className="text-4xl font-bold text-white"
                animateBy="character"
                stagger={0.03}
                direction="up"
            />
        </div>
    );
}
