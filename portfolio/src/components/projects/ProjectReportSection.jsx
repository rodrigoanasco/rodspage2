import { stockReportPdf } from '../../data/projectContent'

export default function ProjectReportSection() {
  return (
    <section className="project-report-card projects-reveal">
      <div>
        <p className="projects-eyebrow">Data project</p>
        <h2>Stock Market Predictor</h2>
        <p>
          A Python pipeline that combines FinBERT news sentiment, Reddit signals, macroeconomic
          indicators, and historical market data into time-aligned features for short-term stock
          movement prediction.
        </p>
      </div>
      <div className="project-report-panel">
        <span>Python / FinBERT / XGBoost</span>
        <strong>Sentiment Prediction Pipeline</strong>
        <p>
          Report covering data collection, feature engineering, ensemble modeling, and results
          analysis.
        </p>
        <a href={stockReportPdf} download>
          Download PDF
          <span aria-hidden="true">-&gt;</span>
        </a>
      </div>
    </section>
  )
}
