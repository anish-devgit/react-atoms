import DecryptedText from "@/components/ui/DecryptedText";

export default function DecryptedTextDemo() {
    return (
        <div className="flex items-center justify-center min-h-[400px] p-8">
            <DecryptedText
                text="Hover to decrypt this text"
                className="text-4xl font-bold text-white"
                encryptedClassName="text-4xl font-bold text-white/20"
                speed={50}
                maxIterations={10}
            />
        </div>
    );
}
