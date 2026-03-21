<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verify your Upis Delta account</title>
</head>
<body style="margin:0;padding:0;background:#F0F4F8;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:48px 0;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(47,82,133,0.10);border:1px solid rgba(47,82,133,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2F5285 0%,#3d6ba8 100%);padding:32px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span>Delta | upisdelta.com</span>
                  </td>
                  <td align="right">
                    <span style="font-size:10px;color:rgba(168,189,208,0.8);letter-spacing:0.15em;text-transform:uppercase;">Data · AI · Execution</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">

              <p style="margin:0 0 8px;font-size:11px;color:#7A6B72;letter-spacing:0.12em;text-transform:uppercase;">
                Account Verification
              </p>
              <h1 style="margin:0 0 24px;font-size:24px;font-weight:700;color:#0A0A0A;letter-spacing:-0.3px;line-height:1.3;">
                Welcome, {{name}}.
              </h1>

              <p style="margin:0 0 20px;font-size:14px;color:#5a6a7e;line-height:1.8;">
                Your <strong style="color:#2F5285;">Upis Delta</strong> account has been created. 
                Before you can access real-time market data, define AI-powered conditions 
                and automate your orders — please verify your email address.
              </p>

              <p style="margin:0 0 32px;font-size:14px;color:#5a6a7e;line-height:1.8;">
                This step ensures the security of your account and the integrity 
                of any orders placed through the platform.
              </p>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
                <tr>
                  <td style="border-radius:30px;background:#2F5285;">
                    <a href="{{domain}}/api/auth/verify/{{verifyToken}}"
                      style="display:inline-block;padding:14px 36px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.04em;border-radius:30px;">
                      Verify My Account →
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Fallback link -->
              <div style="background:#F4F6FA;border:1px solid rgba(47,82,133,0.08);border-radius:10px;padding:16px 20px;margin-bottom:32px;">
                <p style="margin:0 0 6px;font-size:11px;color:#7A6B72;letter-spacing:0.08em;text-transform:uppercase;">
                  Button not working?
                </p>
                <p style="margin:0;font-size:12px;color:#2F5285;word-break:break-all;line-height:1.6;">
                  {{domain}}/api/auth/verify/{{verifyToken}}
                </p>
              </div>

              <!-- Info box -->
              <div style="border-left:3px solid #A8BDD0;padding:12px 16px;background:rgba(168,189,208,0.06);border-radius:0 8px 8px 0;">
                <p style="margin:0;font-size:12px;color:#7A6B72;line-height:1.7;">
                  This link is valid for <strong style="color:#0A0A0A;">24 hours</strong>. 
                  If you did not create this account, you can safely ignore this email.
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px;border-top:1px solid rgba(47,82,133,0.08);">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:12px;color:#7A6B72;line-height:1.7;">
                    <strong style="color:#fff;">Upis Delta</strong><br>
                    Real-time data · AI condition execution · Order automation
                  </td>
                  <td align="right" style="font-size:11px;color:#A8BDD0;">
                    © 2026 Upis Fintech<br>
                    All rights reserved
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:16px;font-size:11px;color:#A8BDD0;line-height:1.6;">
                    This email was sent because an account was registered using this address. 
                    If this was not you, no action is required.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
