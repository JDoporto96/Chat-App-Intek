import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Collapse, List, ListItemButton, ListItemText} from '@mui/material';
import { t } from 'i18next';
import React from 'react';
import { useTranslation } from 'react-i18next';


const lngs = {
    en: { nativeName: 'English' },
    es: { nativeName: 'Español' }
  };


function Language() {
    const [open, setOpen] = React.useState(true);
    const { i18n } = useTranslation();
    const handleClick = () => {
      setOpen(!open);
    };
  
    return (
    
    <>
        <ListItemButton onClick={handleClick}>
          <ListItemText primary={t("Language")} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>

            
            {Object.keys(lngs).map((lng) => (
                <ListItemButton sx={{ pl: 4 }} key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={(e) => {i18n.changeLanguage(lng)}}>
                {lngs[lng].nativeName}
                </ListItemButton>
            ))}
          </List>
        </Collapse>
    </>
  )
}

export default Language