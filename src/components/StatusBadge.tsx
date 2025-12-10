import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getVariant = () => {
    switch (status.toLowerCase()) {
      case 'ativo':
        return 'success';
      case 'pendente':
        return 'warning';
      case 'inativo':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Badge variant={getVariant()}>
      {status}
    </Badge>
  );
}
