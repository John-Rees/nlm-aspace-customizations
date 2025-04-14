class CustomErrorController < ApplicationController
    def redir
        flash[:error] = 'This collection is currently not available for immediate circulation. Please contact the onsite reference librarian or the NLM Support Center for more information.'
        redirect_back(fallback_location: root_path)
    end
end