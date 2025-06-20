import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center text-red-600">
          <h2 className="text-2xl font-bold mb-2">Something went wrong.</h2>
          <pre className="bg-red-50 p-4 rounded">{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
