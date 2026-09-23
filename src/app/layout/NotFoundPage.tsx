import { Link } from "react-router-dom";

import { Button } from "@/ui/Button";
import { EmptyState } from "@/ui/EmptyState";

export const NotFoundPage = () => (
  <EmptyState
    action={
      <Link to="/">
        <Button>חזרה לדף הראשי</Button>
      </Link>
    }
    description="העמוד או הרשומה שביקשת אינם זמינים."
    title="לא נמצא"
  />
);
