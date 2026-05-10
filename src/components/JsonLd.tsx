interface JsonLdProps {
  schema: object;
}

// JSON.stringify of our own typed objects is safe — no user input reaches this component.
export default function JsonLd({ schema }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
