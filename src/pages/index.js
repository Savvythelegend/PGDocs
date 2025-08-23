import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <Layout title="CloudNativePG Documentation">
      <main
        className="container margin-vert--lg"
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          minHeight: '70vh',
        }}
      >
        <div className="row" style={{ width: '100%' }}>
          <div className="col col--8 col--offset--2" style={{ textAlign: 'left' }}>
            <h1>Welcome to CloudNativePG</h1>
            <p className="text--large">
              The open-source operator designed to manage PostgreSQL workloads 
              on any Kubernetes cluster.
            </p>
            <p>
              Our goal is to provide clear, comprehensive, and accurate information 
              to help you deploy, manage, and operate PostgreSQL in a truly cloud-native way.
            </p>
            <div className="margin-top--lg">
              <Link 
                className="button button--primary button--lg" 
                to="/docs/"
              >
                Get Started with Documentation
              </Link>
            </div>
            <div className="margin-top--md">
              <Link 
                className="button button--outline button--lg" 
                to="/docs/quickstart"
              >
                Quick Start Guide
              </Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
