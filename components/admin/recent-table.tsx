import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

function timeAgo(dateStr: string): string {
  const seconds = Math.floor(
    (new Date("2026-03-26T12:00:00Z").getTime() - new Date(dateStr).getTime()) / 1000
  );
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

interface RecentSpin {
  id: string;
  user: string;
  destination_name: string;
  destination_country: string;
  region: string;
  created_at: string;
}

interface RecentSignup {
  id: string;
  display_name: string;
  email: string;
  created_at: string;
}

export function RecentSpinsTable({ spins }: { spins: RecentSpin[] }) {
  return (
    <Card className="bg-card/50 border-border">
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          Recent Spins
        </h3>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-xs">User</TableHead>
              <TableHead className="text-xs">Destination</TableHead>
              <TableHead className="text-xs text-right">When</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {spins.map((spin) => (
              <TableRow key={spin.id} className="border-border">
                <TableCell className="text-sm py-2">{spin.user}</TableCell>
                <TableCell className="py-2">
                  <span className="text-sm">{spin.destination_name}</span>
                  <Badge variant="outline" className="ml-2 text-[10px] py-0">
                    {spin.region}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground text-right py-2">
                  {timeAgo(spin.created_at)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export function RecentSignupsTable({ signups }: { signups: RecentSignup[] }) {
  return (
    <Card className="bg-card/50 border-border">
      <CardContent className="p-4 sm:p-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">
          Recent Signups
        </h3>
        <Table>
          <TableHeader>
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="text-xs">Name</TableHead>
              <TableHead className="text-xs">Email</TableHead>
              <TableHead className="text-xs text-right">Joined</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {signups.map((user) => (
              <TableRow key={user.id} className="border-border">
                <TableCell className="text-sm py-2">{user.display_name}</TableCell>
                <TableCell className="text-sm text-muted-foreground py-2">
                  {user.email}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground text-right py-2">
                  {timeAgo(user.created_at)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
