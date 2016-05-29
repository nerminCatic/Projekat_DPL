class UserMailer < MandrillMailer::TemplateMailer
  default from: "no-reply@estamparija.com"
  default from_name: "eStamparija"

  def registration_email(user)
  	@user = user
    mandrill_mail(
      template: 'Registration',
      to: @user.email, 
      subject: "eStamparija - Potvrda registracije",
      vars: {
        'CONFIRMATION_LINK' => root_url + "/api/users/confirm?token=" + @user.generate_auth_token,
        'IME_USERA' => @user.name,
      }
    )
  end

  def reset_pass_email(user)
    @user = user
    mandrill_mail(
      template: 'ResetPassword',
      to:   @user.email, 
      subject: "eStamparija - Reset lozinke",
      vars: {
        'RESET_LINK' => root_url + "/api/passwordresets/change_form?token=" + @user.generate_auth_token,
      }
    )
  end
end
