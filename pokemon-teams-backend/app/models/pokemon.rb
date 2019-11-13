class Pokemon < ApplicationRecord
  belongs_to :trainer

  def serialized
    self.to_json({
            except: [:created_at, :updated_at],
            include: {
                trainer: {
                    only: [:id]
                }
            }
        })
  end

  def self.make_new_with_faker
    
  end


end
