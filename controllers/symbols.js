export async function getSymbols(req, res) {
  return res.json({
    options: [
    {
      display: "BTCUSDT",
      value: "BTCUSDT"
    },
    {
      display: "ETHUSDT",
      value: "ETHUSDT"
    }]
  });
}