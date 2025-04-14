Rails.application.routes.draw do
    get "/custom", to: "custom_error#redir", as: "custom"
end