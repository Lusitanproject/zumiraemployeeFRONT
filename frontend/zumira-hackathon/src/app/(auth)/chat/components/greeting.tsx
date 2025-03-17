interface GreetProps {
    name: string;
    closed?: boolean;
}

export function Greeting({ name, closed }: GreetProps) {
    return (
        <p
            className={`text-4xl transition-opacity duration-200 mt-3 ${
                closed ? "h-0 opacity-0" : "h-auto opacity-100"
            }`}
        >
            Olá <strong>{name}</strong>, como posso te ajudar hoje?
        </p>
    );
}
