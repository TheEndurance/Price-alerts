export async function getMarkets(req, res) {
  return res.json({
    options: [
    {
      display: "USDT Perpetuals",
      value: "linear"
    }]
  });
}