import TrueFocus from "@/components/ui/TrueFocus";

export default function TrueFocusDemo() {
    return (
        <div className="flex items-center justify-center min-h-[400px] p-8">
            <TrueFocus
                text="True focus reveals clarity"
                className="text-4xl font-bold"
                focusedClassName="text-white"
                blurredClassName="text-white/30"
                focusSpeed={2}
                blurAmount={4}
            />
        </div>
    );
}
