import EventForm from "@/components/admin/EventForm";

export default function CreateEventPage() {
  return (
    <div>
      <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-[var(--color-text)] tracking-tight mb-8">
        Create Event
      </h1>
      <EventForm />
    </div>
  );
}
