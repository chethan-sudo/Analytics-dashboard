import { useState } from "react";
import { Package } from "lucide-react";
import { revenueByProduct, sharedPalette } from "../../data/crmData";
import { formatCompactCurrency, formatFullCurrency, formatInteger } from "../../utils/formatters";
import { SectionCard } from "./SectionCard";

const topRevenueProduct = [...revenueByProduct].sort((a, b) => b.revenue - a.revenue)[0];
const topWinRateProduct = [...revenueByProduct].sort((a, b) => b.winRate - a.winRate)[0];
const sharedBarPalette = [sharedPalette.cyan, sharedPalette.indigo, sharedPalette.green, sharedPalette.amber, sharedPalette.rose, sharedPalette.violet];
const chartData = [...revenueByProduct].sort((a, b) => b.revenue - a.revenue);
const highestRevenue = chartData[0]?.revenue ?? 1;

export const ProductRevenueSection = ({ delay }) => {
  const [activeProduct, setActiveProduct] = useState(revenueByProduct[0]);

  return (
    <SectionCard
      action={
        <div className="section-badge" data-testid="product-revenue-top-badge">
          Ranked by revenue
        </div>
      }
      delay={delay}
      icon={Package}
      subtitle="Simple product ranking with revenue and conversion context."
      testId="product-revenue-section-card"
      title="Revenue by product"
    >
      <div className="product-section-layout" data-testid="product-revenue-layout">
        <div className="product-detail-panel" data-testid="product-revenue-detail-panel">
          <p className="product-detail-panel__label">Focused product</p>
          <h3 className="product-detail-panel__title" data-testid="product-revenue-detail-title">
            {activeProduct.product}
          </h3>
          <p className="product-detail-panel__subtitle" data-testid="product-revenue-detail-subtitle">
            {formatFullCurrency(activeProduct.revenue)} from {formatInteger(activeProduct.deals)} closed deals.
          </p>

          <div className="product-detail-panel__metrics">
            <div className="product-detail-panel__metric" data-testid="product-revenue-detail-revenue">
              <span className="product-detail-panel__metric-label">Revenue</span>
              <span className="product-detail-panel__metric-value">{formatCompactCurrency(activeProduct.revenue)}</span>
            </div>
            <div className="product-detail-panel__metric" data-testid="product-revenue-detail-deals">
              <span className="product-detail-panel__metric-label">Deals</span>
              <span className="product-detail-panel__metric-value">{formatInteger(activeProduct.deals)}</span>
            </div>
            <div className="product-detail-panel__metric" data-testid="product-revenue-detail-win-rate">
              <span className="product-detail-panel__metric-label">Win rate</span>
              <span className="product-detail-panel__metric-value">{activeProduct.winRate}%</span>
            </div>
          </div>

          <p className="product-detail-panel__note" data-testid="product-revenue-detail-note">
            {topRevenueProduct.product} leads revenue, while {topWinRateProduct.product} has the highest win rate.
          </p>
        </div>

        <div className="product-ranking product-ranking--chart" data-testid="product-revenue-chart-panel">
          <div className="product-ranking-chart" data-testid="product-revenue-bar-chart">
            {chartData.map((product, index) => {
              const ratio = Math.max(0.14, product.revenue / highestRevenue);
              const color = sharedBarPalette[index % sharedBarPalette.length];
              const isActive = activeProduct.product === product.product;

              return (
                <button
                  className={`product-rank-row ${isActive ? "product-rank-row--active" : ""}`.trim()}
                  data-testid={`product-rank-row-${product.product.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                  key={product.product}
                  onFocus={() => setActiveProduct(product)}
                  onMouseEnter={() => setActiveProduct(product)}
                  style={{ "--rank-bar-ratio": ratio, "--rank-bar-color": color }}
                  type="button"
                >
                  <div className="product-rank-row__head">
                    <span className="product-rank-row__label">{`${index + 1}. ${product.product}`}</span>
                    <span className="product-rank-row__value">{formatCompactCurrency(product.revenue)}</span>
                  </div>

                  <div className="product-rank-row__track">
                    <span className="product-rank-row__fill" />
                  </div>

                  <p className="product-rank-row__meta">{formatInteger(product.deals)} deals · {product.winRate}% win</p>
                </button>
              );
            })}
          </div>

          <div className="product-ranking__legend" data-testid="product-revenue-color-key">
            <span className="product-ranking__legend-text">Ranked revenue bars · hover updates focused product</span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};