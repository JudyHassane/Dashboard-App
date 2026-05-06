import type { ReactNode } from "react";
import { authStyles } from "../styles/authStyles";
import WavySeparator from "../pages/Auth/components/WavySeparator";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export default function AuthLayout({
  children,
  title,
  subtitle,
}: AuthLayoutProps) {
  return (
    <div className={authStyles.layout.container}>
      {/* Left Panel: Form */}
      <div className={authStyles.layout.leftPanel}>
        <div className={authStyles.layout.leftPanelInner}>{children}</div>
      </div>

      {/* Right Panel: Gradient + Illustration */}
      <div className={authStyles.layout.rightPanel}>
        <div
          className={authStyles.layout.rightPanelInner}
          style={{
            background: authStyles.getGradient(),
          }}
        >
          <WavySeparator />

          {/* Decorative blurred circles */}
          <div className={authStyles.decoration.blurCircle1} />
          <div className={authStyles.decoration.blurCircle2} />

          {/* Centered content wrapper */}
          <div className={authStyles.layout.contentWrapper}>
            <div className={authStyles.layout.textContainer}>
              <h1 className={authStyles.typography.title}>{title}</h1>

              <p className={authStyles.typography.subtitle}>{subtitle}</p>

              <div className={authStyles.typography.illustration}>
                <img
                  src="/images/auth_illustration2.png"
                  alt="Auth Illustration"
                  className={authStyles.typography.illustrationImg}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
