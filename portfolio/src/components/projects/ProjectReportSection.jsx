import { stockReportPdf } from '../../data/projectContent'

export default function ProjectReportSection() {
  return (
    <article className="project-report" id="stock-market-predictor">
      <h2>Stock Market Predictor</h2>
      <p className="project-meta">Data analysis · Python, FinBERT, XGBoost</p>
      <p>
        A Python pipeline that combines FinBERT news sentiment, Reddit signals, macroeconomic
        indicators, and historical market data into time-aligned features for short-term stock
        movement prediction. The report covers data collection, feature engineering, ensemble
        modeling, and results analysis.
      </p>
      <a href={stockReportPdf} download>
        Download the project report (PDF)
      </a>
    </article>
  )
}
