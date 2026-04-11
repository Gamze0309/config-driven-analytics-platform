import { Component, type ReactNode } from 'react';
import './errorBoundary.css';

type ErrorBoundaryProps = {
  children: ReactNode;
  name?: string;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error?: unknown;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: unknown) {
    console.error('[ErrorBoundary]', this.props.name ?? 'Unnamed', error);
  }

  private reset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const title = this.props.name ? `${this.props.name} crashed` : 'Something went wrong';
    const message = this.state.error instanceof Error ? this.state.error.message : String(this.state.error);

    return (
      <section className="card errorBoundary" aria-label="Error">
        <h2 className="cardTitle">{title}</h2>
        <p>Try reloading the page or reset this view.</p>

        <div className="errorBoundaryActions">
          <button className="linkButton" type="button" onClick={this.reset}>
            Reset
          </button>
          <button
            className="linkButton"
            type="button"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>

        <div className="errorBoundaryDetails">
          <div className="kv">
            <div className="kvRow">
              <div className="kvKey">Error</div>
              <div className="kvVal">
                <code>{message}</code>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
