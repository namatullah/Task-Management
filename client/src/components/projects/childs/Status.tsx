const Status = ({ status }: { status: string }) => {
  var textColor = "";
  switch (status) {
    case "not_started":
      textColor = "#1B1920FF"; break;
    case "in_progress":
      textColor = "#0288d1";break;
    case "completed":
      textColor = "#21E62BFF";break;
    case "on_hold":
      textColor = "#ed6c02";break;
    case "cancelled":
      textColor = "#d32f2f";break;
  }
  return (
    <p style={{ color: textColor }}>{status?.replace("_", " ").toUpperCase()}</p>
  );
};

export default Status;
