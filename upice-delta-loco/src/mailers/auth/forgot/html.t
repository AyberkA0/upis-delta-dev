<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reset your Upis Delta password</title>
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
                    <span style="font-size:10px;color:rgba(168,189,208,0.8);letter-spacing:0.15em;text-transform:uppercase;">Data · AI · Finance</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">

              <p style="margin:0 0 8px;font-size:11px;color:#7A6B72;letter-spacing:0.12em;text-transform:uppercase;">
                Password Reset
              </p>
              <h1 style="margin:0 0 24px;font-size:24px;font-weight:700;color:#0A0A0A;letter-spacing:-0.3px;line-height:1.3;">
                Reset your password, {{name}}.
              </h1>

              <p style="margin:0 0 20px;font-size:14px;color:#5a6a7e;line-height:1.8;">
                We received a request to reset the password for your 
                <strong style="color:#2F5285;">Upis Delta</strong> account. 
                Click the button below to choose a new password.
              </p>

              <p style="margin:0 0 32px;font-size:14px;color:#5a6a7e;line-height:1.8;">
                For the security of your account and any connected broker integrations, 
                please choose a strong password that you do not use elsewhere.
              </p>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin:0 0 32px;">
                <tr>
                  <td style="border-radius:30px;background:#2F5285;">
                    <a href="{{domain}}/reset-password?token={{resetToken}}"
                      style="display:inline-block;padding:14px 36px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.04em;border-radius:30px;">
                      Reset My Password →
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
                  {{domain}}/reset-password?token={{resetToken}}
                </p>
              </div>

              <!-- Warning box -->
              <div style="border-left:3px solid #E31837;padding:12px 16px;background:rgba(227,24,55,0.04);border-radius:0 8px 8px 0;">
                <p style="margin:0;font-size:12px;color:#7A6B72;line-height:1.7;">
                  This link is valid for <strong style="color:#0A0A0A;">1 hour</strong>. 
                  If you did not request a password reset, please 
                  <strong style="color:#E31837;">ignore this email</strong> — 
                  your password will remain unchanged.
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
                    <strong style="color:#0A0A0A;">Upis Delta</strong><br>
                    Real-time data · AI condition execution · Order automation
                  </td>
                  <td align="right" style="font-size:11px;color:#A8BDD0;">
                    © 2026 Upis Fintech<br>
                    All rights reserved
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:16px;font-size:11px;color:#A8BDD0;line-height:1.6;">
                    This email was sent because a password reset was requested for this address.
                    If this was not you, no action is required — your account remains secure.
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
