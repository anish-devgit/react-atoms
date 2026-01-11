import { memo } from "react";

export interface PropDefinition {
    name: string;
    type: string;
    defaultValue?: string;
    description: string;
    required?: boolean;
}

interface PropsTableProps {
    props: PropDefinition[];
}

function PropsTableComponent({ props }: PropsTableProps) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                            Property
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                            Type
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                            Default
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                            Description
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.map((prop, index) => (
                        <tr
                            key={prop.name}
                            className="border-b border-border/50 hover:bg-white/[0.02] transition-colors"
                        >
                            <td className="py-3 px-4 font-mono text-sm text-accent">
                                {prop.name}
                                {prop.required && (
                                    <span className="text-red-400 ml-1">*</span>
                                )}
                            </td>
                            <td className="py-3 px-4 font-mono text-xs text-foreground-muted">
                                {prop.type}
                            </td>
                            <td className="py-3 px-4 font-mono text-xs text-foreground-muted">
                                {prop.defaultValue || "—"}
                            </td>
                            <td className="py-3 px-4 text-sm text-foreground-muted leading-relaxed">
                                {prop.description}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export const PropsTable = memo(PropsTableComponent);
