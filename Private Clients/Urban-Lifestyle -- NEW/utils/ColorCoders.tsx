export function colorCoder(paid: boolean, packed: string, shipped: string, delivered: string) {
  if (!paid) {
    return 'danger';
  }
  if (paid && packed.length === 0 && shipped.length === 0 && delivered.length === 0) {
    return 'warning';
  }
  if (paid && packed.length > 0 && shipped.length === 0 && delivered.length === 0) {
    return 'green';
  }
  if (paid && packed.length > 0 && shipped.length > 0 && delivered.length === 0) {
    return 'tertiary';
  }
  if (paid && packed.length > 0 && shipped.length > 0 && delivered.length > 0) {
    return 'success';
  }
  return 'none';
}

export function colorMarker() {
  return (
    <>
      <label>STATUS OF ORDER:</label>
      <div>
        {/* <IonIcon style={{ marginLeft: '5px' }} color='danger' icon={ellipse} />
          Not paid
          <IonIcon style={{ marginLeft: '5px' }} color='warning' icon={ellipse} />
          Paid
          <IonIcon style={{ marginLeft: '5px' }} color='green' icon={ellipse} />
          Packed
          <IonIcon style={{ marginLeft: '5px' }} color='tertiary' icon={ellipse} />
          Shipped
          <IonIcon style={{ marginLeft: '5px' }} color='success' icon={ellipse} />
          Out to Delevery */}
      </div>
    </>
  );
}
