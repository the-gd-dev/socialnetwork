Database Design 
--SocialNetwork
    ---users
        ----id
        ----uuid
        ----name
        ----first_name
        ----last_name
        ----email
        ----alt_email
        ----password(hashed)
        ----phone_number
        ----alt_phonenumber
        ----is_deactivated
        ----is_disabled
        ----created_at
        ----updated_at
        ----deleted_at
    ---user_stickers (Later)
    ---block_list
        ----id
        ----user_id
        ----blocked_by
        ----created_at
        ----updated_at
        ----deleted_at
    ---friends
        ----id
        ----user_id
        ----friend_id
        ----relation_id
        ----relation_confirmation
        ----is_friends
        ----is_followed
        ----created_at
        ----updated_at
        ----deleted_at
    ---user_meta
        ----user_id
        ----display_picture
        ----birthday
        ----bio_text
        ----education
        ----favorites
        ----employment
        ----relationship_status
        ----intersted_in
        ----created_at
        ----updated_at
        ----deleted_at        
    ---posts
        ----id
        ----user_id
        ----text
        ----reaction_id
        ----privacy_id
        ----created_at
        ----updated_at
        ----deleted_at
    ---photos
        ----id
        ----user_id
        ----url
        ----dimensions (WxH)
        ----mime
        ----size(in bytes)
        ----created_at
        ----updated_at
        ----deleted_at
    ---videos
        ----id
        ----user_id
        ----url
        ----dimensions (WxH)
        ----resolution
        ----mime
        ----size(in bytes)
        ----created_at
        ----updated_at
        ----deleted_at
    ---comments
        ----id
        ----post_id
        ----text
        ----reaction_id
        ----created_at
        ----updated_at
        ----deleted_at
    ---replies
        ----id
        ----comment_id
        ----text
        ----reaction_id
        ----created_at
        ----updated_at
        ----deleted_at

