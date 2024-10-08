import { createRoot } from "react-dom/client";
import Root from "./pages/Root";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<Root />);
